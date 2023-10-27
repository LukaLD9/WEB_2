import { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Textarea,
    Input
} from "@nextui-org/react";
import axios from 'axios';
import  IMatchData from "../interface/IMatchData";
import { useAuth0 } from "@auth0/auth0-react";
import { EditIcon } from "./EditIcon";

const UpdateResult = ({ matchData }: { matchData: IMatchData }) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  //const [matchData, setmatchData] = useState(matchData);
  const [scorefirst, setScorefirst] = useState(matchData.scorefirst);
  const [scoresecond, setScoresecond] = useState(matchData.scoresecond);

  
  const { isAuthenticated, user } = useAuth0();

  const updateResult = () => {
    // check if user.sub is equal to iduser
    if (isAuthenticated && user?.sub !== matchData.iduser) {
        window.alert("You are not allowed to update this result!");
        return;
    }


    // Check if the data is valid
    if (scorefirst < 0 || scoresecond < 0) {
        window.alert("Score must be positive number!");
        return;
    }
    // Prepare the data for the API request
    const dataToSend = {
        idMatch: matchData.idmatch,
        scoreFirst: scorefirst,
        scoreSecond: scoresecond
    };

    
    // Send the request to the API, try to catch errors
    axios.put('http://localhost:5000/api/match/result', dataToSend)
        .then((response) => {
            console.log(response);
            window.location.reload();
        }
    ).catch((error) => {
        console.log(error);
    });
    
  };


  return (
    <>
      <Button onPress={onOpen}>Update result</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{matchData.competitionname}</ModalHeader>
              <ModalBody>
                 <div className="flex gap-4">
                    <Input
                        name="scorefirst"
                        value={scorefirst.toString()}
                        onChange={(event) => setScorefirst(parseInt(event.target.value))}
                        type="number"
                        label={matchData.competitorfirst}
                        placeholder="Enter score"
                        variant="bordered"
                        isInvalid={scorefirst < 0}
                    />
                    <Input
                        name="scoresecond"
                        value={scoresecond.toString()}
                        onChange={(event) => setScoresecond(parseInt(event.target.value))}
                        type="number"
                        label={matchData.competitorsecond}
                        placeholder="Enter score"
                        variant="bordered"
                        isInvalid={scoresecond < 0}
                    />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button onPress={() => {onClose();
                        updateResult();
                        }}>
                  Continue
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}


export default UpdateResult;