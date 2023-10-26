import {  Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    getKeyValue,
} from "@nextui-org/react";

const rows = [
    {
        key: "1",
        name: "Tony Reichert",
        won: "1",
        lost: "0",
        draw: "0",
        points: "3"
    },
    {
        key: "2",
        name: "Zoey Lang",
        won: "0",
        lost: "1",
        draw: "0",
        points: "0"
    },
    {
        key: "3",
        name: "Jane Fisher",
        won: "0",
        lost: "0",
        draw: "1",
        points: "1"
    },
  ];


const columns = [
    {
        key: "name",
        label: "NAME",
    },
    {
        key: "won",
        label: "WON",
    },
    {
        key: "lost",
        label: "LOST",
    },
    {
        key: "draw",
        label: "DRAW",
    },
    {
        key: "points",
        label: "POINTS",
    }
]

function TableOfCompetitors() {

    //  <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-center items-center w-3-4">
                <div className="w-3/4">
                    <h1 className="text-xl font-bold text-center mb-4 mt-4">Competition name</h1>
                    <Table aria-label="Example table with custom cells">
                        <TableHeader columns={columns}>
                            {(column) => (
                            <TableColumn key={column.key} align="center">
                                {column.label}
                            </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={rows}>
                            {(item) => (
                            <TableRow key={item.key}>
                                {(columnKey) => <TableCell>{getKeyValue(item,columnKey)}</TableCell>}
                            </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default TableOfCompetitors;