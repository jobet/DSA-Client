import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

export function LineGraph({ labels, data1, data2, label1, label2, color1, color2 }) {
  const data = labels.map((label, index) => ({
    name: label,
    [label1]: data1[index],
    [label2]: data2[index],
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={label1} stroke={color1} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey={label2} stroke={color2} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function PieGraph({ labels, datas, label, color }) {
  const data = labels.map((label, index) => ({
    name: label,
    value: datas[index],
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius="80%"
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={color[index % color.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function BarGraph({ labels, data1, data2, data3, label1, label2, label3, color1, color2, color3 }) {
  const data = labels.map((label, index) => ({
    name: label,
    [label1]: data1[index],
    [label2]: data2[index],
    [label3]: data3[index],
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={label1} fill={color1} />
        <Bar dataKey={label2} fill={color2} />
        <Bar dataKey={label3} fill={color3} />
      </BarChart>
    </ResponsiveContainer>
  );
}