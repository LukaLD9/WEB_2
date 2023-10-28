import {  Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    getKeyValue,
    Button,
} from "@nextui-org/react";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ICompetitorData from "../interface/ICompetitorData";


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

    // get userid from auth0
    const { user } = useAuth0();
    const userid = user?.sub;

    // get competitionid from url
    const url = window.location.href;
    const competitionid = url.substring(url.lastIndexOf('/') + 1);

    const navigate = useNavigate();

    // iz api dohvati sva natjecanja i prikazi ih u tablici

    const [competitors, setCompetitors] = React.useState<ICompetitorData[]>([]);
    const competitionName = competitors[0]?.competitionname || "";
    
    React.useEffect(() => {
        axios.get(`http://localhost:5000/api/public/allcompetitors/${competitionid}`)
        .then((response) => {
            if(response.data.length === 0) {
                navigate(`/NotFound`);
            }
            setCompetitors(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-center items-center w-3-4">
                <div className="w-3/4">
                    <h1 className="text-xl font-bold text-center mb-4 mt-4">{competitionName}</h1>
                    <Table aria-label="Example table with custom cells">
                        <TableHeader columns={columns}>
                            {(column) => (
                            <TableColumn key={column.key} align="center">
                                {column.label}
                            </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody
                            emptyContent={"There are no competitors yet! "}
                            items={competitors}>
                            {(item) => (
                            <TableRow key={item.idcompetitor}>
                                {(columnKey) => <TableCell>{getKeyValue(item,columnKey)}</TableCell>}
                            </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <div className="flex justify-center mt-4">
                        <Button className="mr-4 ml-4" onClick={() => navigate(`/schedule/${competitionid}`)}>
                                                Schedule
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableOfCompetitors;