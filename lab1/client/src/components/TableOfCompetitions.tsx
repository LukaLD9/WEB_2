import {  Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    getKeyValue
} from "@nextui-org/react";
import React from "react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import CreateCompetition from "./CreateCompetition";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import ICompetitionData from "../interface/ICompetitionData";
import config from "../config";

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
    // get userid from auth0
    const { user, getAccessTokenSilently } = useAuth0();
    //const userid = user?.sub;

    // iz api dohvati sva natjecanja i prikazi ih u tablici

    const [competitions, setCompetitions] = React.useState<ICompetitionData[]>([]);

    
    // get competitions from api with axios and token
    React.useEffect(() => {
        const getCompetitions = async () => {
            try {
                const token = await getAccessTokenSilently();
                const userid = user?.sub;
                const response = await axios.get(`${config.API_BASE_URL}/api/competition/user/${userid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCompetitions(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getCompetitions();
    }, []);
    

    const navigate = useNavigate();

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
                        <TableBody 
                            emptyContent={"You have no competitions yet! "}
                            items={competitions}>
                            {(item) => (
                            <TableRow key={item.idcompetition}>
                                {(columnKey) =>  
                                    columnKey === "actions" ?
                                    <TableCell>
                                        <div className="flex justify-center">
                                            <Button className="mr-4 ml-4" onClick={() => navigate(`table/${item.idcompetition}`)}>
                                                Table
                                            </Button>
                                            <Button className="mr-4 ml-4" onClick={() => navigate(`schedule/${item.idcompetition}`)}>
                                                Schedule
                                            </Button>
                                        </div>
                                    </TableCell>
                                    :
                                    <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                                }
                            </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <div className="flex justify-center mt-4">
                        <CreateCompetition />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableOfCompetitions;