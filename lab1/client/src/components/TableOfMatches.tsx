import {  Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Pagination,
    getKeyValue
} from "@nextui-org/react";
import React from "react";
import { Button } from "@nextui-org/react";
import UpdateResult from "./UpdateResult";
import IMatchData from "../interface/IMatchData";


const rows : IMatchData[] = [
    {
        id: "1",
        firstCompetitor: "Tony Reichert",
        secondCompetitor: "Zoey Lang",
        firstScore: "3",
        secondScore: "2",
        round: "1",
    },
    {
        id: "2",
        firstCompetitor: "Jane Fisher",
        secondCompetitor: "William Howard",
        firstScore: "2",
        secondScore: "3",
        round: "1",

    },
    {
        id: "3",
        firstCompetitor: "Tony Reichert",
        secondCompetitor: "Jane Fisher",
        firstScore: "3",
        secondScore: "1",
        round: "2",
    },
    {
        id: "4",
        firstCompetitor: "William Howard",
        secondCompetitor: "Zoey Lang",
        firstScore: "3",
        secondScore: "2",
        round: "2",
    },
  ];


const columns = [
    {
        key: "firstCompetitor",
        label: "FIRST COMPETITOR",
    },
    {
        key: "secondCompetitor",
        label: "SECOND COMPETITOR",
    },
    {
        key: "firstScore",
        label: "FIRST SCORE",
    },
    {
        key: "secondScore",
        label: "SECOND SCORE",
    },
    {
        key: "actions",
        label: "",
    },
]


function TableOfMatches() {
    // iz api dohvati sva natjecanja i prikazi ih u tablici
    const [page, setPage] = React.useState(1);

    // broj stranica je najveći round iz rows
    const pages = Math.max(...rows.map((row) => parseInt(row.round)));

    // na svakoj stranici prikazati sve matcheve koji imaju taj round
    const items = rows.filter((row) => parseInt(row.round) === page);
    
    
    //  <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-center items-center w-3-4">
                <div className="w-3/4">
                    <h1 className="text-xl font-bold text-center mb-4 mt-4">My Matches</h1>
                    <Table aria-label="Example table with custom cells"
                    bottomContent={
                        <div className="flex w-full justify-center">
                          <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                          />
                        </div>
                    }>
                        <TableHeader columns={columns}>
                            {(column) => (
                            <TableColumn key={column.key} align="start">
                                {column.label}
                            </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={items}>
                            {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => 
                                    columnKey === "actions" ?
                                    <TableCell>
                                        <UpdateResult rowData={item}/>
                                    </TableCell>
                                    :
                                    <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                                }
                            </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default TableOfMatches;