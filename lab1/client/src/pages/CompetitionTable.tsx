import NavigationBar from "../components/NavigationBar";
import TableOfCompetitors from "../components/TableOfCompetitors";
import axios from 'axios';
import { useEffect, useState } from "react";

function CompetitionTable() {

    // dohvati id iz parametra url-a
    const id = window.location.pathname.split("/")[2];

    // state za spremanje podataka o natjecanju
    const [competition, setCompetition] = useState({
        name: "",
        date: "",
        location: "",
        competitors: []
    });
    
    // dohvati podatke o natjecanju i spremi ih u state koje ce se koristiti za prikaz podataka u tablici
    useEffect(() => {
        axios.get(`http://localhost:5000/api/competition/${id}`)
            .then(response => {
                console.log(response.data);
                setCompetition(response.data);
            })
            .catch(error => console.log(error))
    }, [])



    return (
        <div>
            <NavigationBar />
            <TableOfCompetitors />
        </div>
    );
}

export default CompetitionTable;