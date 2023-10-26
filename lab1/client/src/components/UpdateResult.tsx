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

const UpdateResult = ({ rowData }: { rowData: IMatchData }) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  //const [matchData, setmatchData] = useState(rowData);
  const [scorefirst, setScorefirst] = useState(rowData.firstScore);
  const [scoresecond, setScoresecond] = useState(rowData.secondScore);

  

  const updateResult = () => {
    // Prepare the data for the API request
    const dataToSend = {
        id: rowData.id,
        scorefirst,
        scoresecond
    };

    console.log(dataToSend);
    
    /*
    // Send the request to the API, try to catch errors
    axios.post('http://localhost:5000/competition', dataToSend)
        .then((response) => {
            console.log(response);
        }
    ).catch((error) => {
        console.log(error);
    });
    /*/
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
              <ModalHeader className="flex flex-col gap-1">New competition</ModalHeader>
              <ModalBody>
                 <div className="flex gap-4">
                    <Input
                        name="scorefirst"
                        value={scorefirst}
                        onChange={(event) => setScorefirst(event.target.value)}
                        type="number"
                        label={rowData.firstCompetitor}
                        placeholder="Enter name of competition"
                        variant="bordered"
                    />
                    <Input
                        name="scoresecond"
                        value={scoresecond}
                        onChange={(event) => setScoresecond(event.target.value)}
                        type="number"
                        label={rowData.secondCompetitor}
                        placeholder="Enter name of competition"
                        variant="bordered"
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