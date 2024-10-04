import React from "react";
import { AwardFill } from "react-bootstrap-icons";
import BootstrapTable from "react-bootstrap-table-next";

export default function Leaderboard() {
  const data = [
    {
      rank: "1",
      name: "XYZ",
      points: "200",
    },
    {
      rank: "2",
      name: "ABC",
      points: "150",
    },
    {
      rank: "3",
      name: "PQR",
      points: "100",
    },
    {
      rank: "4",
      name: "STV",
      points: "75",
    },
    {
      rank: "5",
      name: "EGF",
      points: "50",
    },
  ];
  const columns = [
    {
      dataField: "rank",
      text: "Rank #",
      sort: true,
      formatter: (cell, row) => {
        let iconProps = null;

        if (row.rank === "1") iconProps = { color: "gold" };
        if (row.rank === "2") iconProps = { color: "silver" };
        if (row.rank === "3") iconProps = { color: "#CE8946" };

        if (!iconProps) return row.rank;

        return <AwardFill {...iconProps} />;
      },
    },
    { dataField: "name", text: "Name", sort: true },
    { dataField: "points", text: "Points", sort: true },
  ];

  return (
    <BootstrapTable
      keyField="id"
      data={data}
      columns={columns}
      bootstrap4
      bordered={false}
    />
  );
}
