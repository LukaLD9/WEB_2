import {  Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Pagination,
    getKeyValue,
    Spinner
} from "@nextui-org/react";
import React from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import UpdateResult from "./UpdateResult";
import IMatchData from "../interface/IMatchData";
import axios from "axios";


const columns = [
    {
        key: "round",
        label: "ROUND",
    },
    {
        key: "date",
        label: "DATE",
    },
    {
        key: "competitorfirst",
        label: "FIRST COMPETITOR",
    },
    {
        key: "competitorsecond",
        label: "SECOND COMPETITOR",
    },
    {
        key: "scorefirst",
        label: "FIRST SCORE",
    },
    {
        key: "scoresecond",
        label: "SECOND SCORE",
    },
    {
        key: "actions",
        label: "",
    },
]


function TableOfMatches() {
    const navigate = useNavigate();

    // get competitionid from url
    const url = window.location.href;
    const competitionid = url.substring(url.lastIndexOf('/') + 1);

    // iz api dohvati sva natjecanja i prikazi ih u tablici

    const [matches, setMatches] = React.useState<IMatchData[]>([]);
    const competitionName = matches[0]?.competitionname || "";
    
    const [page, setPage] = React.useState(1);
    const [pages, setPages] = React.useState(1);

    React.useEffect(() => {
        axios.get(`http://localhost:5000/api/match/byCompetition/${competitionid}`)
        .then((response) => {
            setMatches(response.data);
            // set number of pages to max round number
            setPages(Math.max(...response.data.map((match : IMatchData) => match.round)));
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    

    // filter matches by round and don't show matches where first and second competitor are the same (bye) 
    const matchesFiltered = matches.filter((match) => match.round === page)
                                    .filter((match) => match.competitorfirst !== match.competitorsecond);
    
   
    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-center items-center w-3-4">
                <div className="w-3/4">
                    <h1 className="text-xl font-bold text-center mb-4 mt-4">{competitionName}</h1>
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
                        <TableBody
                            loadingContent={<Spinner />}
                            items={matchesFiltered}>
                            {(match) => (
                            <TableRow key={match.idmatch}>
                                {(columnKey) => 
                                    columnKey === "actions" ?
                                    <TableCell>
                                        <UpdateResult matchData={match}/>
                                    </TableCell>
                                    : columnKey === 'date' ?
                                    <TableCell>{new Date(getKeyValue(match, columnKey)).toLocaleDateString()}</TableCell>
                                    :
                                    <TableCell>{getKeyValue(match, columnKey)}</TableCell>
                                }
                            </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <div className="flex justify-center mt-4">
                        <Button className="mr-4 ml-4" onClick={() => navigate(`/table/${competitionid}`)}>
                                                Table
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableOfMatches;