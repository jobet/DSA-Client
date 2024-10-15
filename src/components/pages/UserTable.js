import React from "react";
import { useTable, useRowSelect, usePagination } from "react-table";
import { BiArrowToLeft, BiLeftArrowAlt, BiRightArrowAlt, BiArrowToRight, BiTrash } from "react-icons/bi";
import Axios from 'axios';
import Swal from 'sweetalert2';

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return <input type="checkbox" className="backendchkbox" ref={resolvedRef} {...rest} />;
  }
);

const formatDate = (date) => {
  const formattedDate = new Date(date);
  const day = formattedDate.getDate();
  const month = formattedDate.getMonth() + 1;
  const year = formattedDate.getFullYear();
  return `${month}-${day}-${year}`;
};

const deleteUser = (user) => {
  Swal.fire({
    title: `Are you sure you want to delete ${user.useremail_reg}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#B8336A',
    cancelButtonColor: '#333',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.delete(`${process.env.REACT_APP_API_URL}/api/username/delete/${user.useremail_reg}`);
    }
  });
};

const deleteUsers = (users) => {
  Swal.fire({
    title: 'Are you sure you want to delete selected records?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#B8336A',
    cancelButtonColor: '#333',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      users.forEach(user => {
        Axios.delete(`${process.env.REACT_APP_API_URL}/api/username/delete/${user.useremail_reg}`);
      });
    }
  });
};

const UserCard = ({ user, getToggleRowSelectedProps }) => (
  <div className="userManagementDivider">
    <div className="userManagementFunction">
      <div className="userManagementButtons">
      <IndeterminateCheckbox {...getToggleRowSelectedProps()} />
        <button className="deletebtn" onClick={() => deleteUser(user)}>
              <BiTrash />
        </button>
      </div>
      <div className="userManagementInfo">
        <img src={user.useravatar_url} alt={`${user.name}'s avatar`} className="user-avatar" />
        <div className="userManagementDetails">
          <h3>{user.username_reg}</h3>
          <p>{user.useremail_reg}</p>
          <p><strong>Confirmed</strong> {user.confirmed}</p>
          <p><strong>Code</strong> {user.code}</p>
          <p><strong>Created At</strong> {formatDate(user.user_created)}</p>
          <p><strong>Gender</strong> {user.usergender_reg}</p>
          <p><strong>Year Level</strong> {user.useryear_reg}</p>
          <p><strong>CCIS Program</strong> {user.userprogram_reg}</p>
        </div>
      </div>
    </div>
  </div>
);

export default function UserList({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
    },
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  return (
    <>
      <div className="pagination">
        <button className='deletebtn' onClick={() => deleteUsers(selectedFlatRows.map(d => d.original))}>
          <BiTrash />
        </button>
        <div className="pagination-controls">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            <BiArrowToLeft />
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            <BiLeftArrowAlt />
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            <BiRightArrowAlt />
          </button>
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            <BiArrowToRight />
          </button>
        </div>
      </div>
      <div className="userManagementCard" {...getTableBodyProps()}>
        {page.map(row => {
          prepareRow(row);
          return (
            <UserCard
              key={row.id}
              user={row.original}
              getToggleRowSelectedProps={row.getToggleRowSelectedProps}
            />
          );
        })}
      </div>
      <div className="paginationSelection">
        <div>
          <p><strong>Page</strong></p>
          <input
                type="number"
                className="paginationInput"
                defaultValue={pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  gotoPage(page)
                }}
          />
          <p>of <strong>{pageOptions.length}</strong></p>
        </div>
        <div>
          <p><strong>Show</strong></p>
          <select
              className="paginationSelect"
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
          </select>
        </div>
      </div>
    </>
  );
}