import {  Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    getKeyValue,
    User,
    Chip,
    Tooltip
} from "@nextui-org/react";
import React from "react";
import { Button } from "@nextui-org/react";

const rows = [
    {
      key: "1",
      name: "Tony Reichert",
      system: "CEO",
    },
    {
      key: "2",
      name: "Zoey Lang",
      system: "Technical Lead",
    },
    {
      key: "3",
      name: "Jane Fisher",
      system: "Senior Developer",
    },
    {
      key: "4",
      name: "William Howard",
      system: "Community Manager",
    },
  ];


const columns = [
    {
        key: "name",
        label: "NAME",
    },
    {
        key: "system",
        label: "SYSTEM",
    },
    {
        key: "actions",
        label: "",
    },
]

function TableOfCompetitions() {
    // iz api dohvati sva natjecanja i prikazi ih u tablici


    const renderCell = React.useCallback((user : any , columnKey : any) => {
        const cellValue = user[columnKey];
    
        switch (columnKey) {
          case "name":
            return (
              cellValue
            );
          case "system":
            return (
                cellValue
            );
          case "actions":
            return (
                <div className="flex justify-center">
                    <Button className="mr-4 ml-4">
                        Table
                    </Button>
                    <Button className="mr-4 ml-4">
                        Schedule
                    </Button>
                </div>
            );
          default:
            return cellValue;
        }
      }, []);
    //  <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-center items-center w-3-4">
                <div className="w-3/4">
                    <h1 className="text-xl font-bold text-center mb-4 mt-4">My competitions</h1>
                    <Table aria-label="Example table with custom cells">
                        <TableHeader columns={columns}>
                            {(column) => (
                            <TableColumn key={column.key} align="start">
                                {column.label}
                            </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={rows}>
                            {(item) => (
                            <TableRow key={item.key}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <div className="flex justify-center mt-4">
                        <Button className="">Create new competition</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableOfCompetitions;