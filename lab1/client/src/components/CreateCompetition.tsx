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
import { useAuth0 } from "@auth0/auth0-react";
import config from "../config";


// Function to validate the data before sending it to the API
function validateData(data: any) {
  if (data.name.length === 0) {
    window.alert("Name is required!");
    return false;
  }
  if (data.winPoints < 0 || data.winPoints > 100) {
    window.alert("Win points should be between 0 and 100!");
    return false;
  }
  if (data.drawPoints < 0 || data.drawPoints > 100) {
    window.alert("Draw points should be between 0 and 100!");
    return false;
  }
  if (data.lossPoints < 0 || data.lossPoints > 100) {
    window.alert("Loss points should be between 0 and 100!");
    return false;
  }
  if (data.competitors.split(/[\n;]/)
    .filter((competitor: string) => competitor.length > 0)
    .length < 4 ||
  data.competitors.split(/[\n;]/)
    .filter((competitor: string) => competitor.length > 0)
    .length > 8) {
    window.alert("Competitors are required, 4 to 8!");
    return false;
  }
  return true;
}


export default function CreateCompetition() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const { user, getAccessTokenSilently } = useAuth0();
  const idUser = user?.sub;

  const [competitionData, setCompetitionData] = useState({
    name: '',
    winPoints: 0,
    drawPoints: 0,
    lossPoints: 0,
    competitors: '',
  });

  const handleInputChange = (event : any) => {
    const { name, value } = event.target;
    setCompetitionData({
      ...competitionData,
      [name]: value,
    });
  };

  const createCompetition = () => {
    // Check if the data is valid
    if (!validateData(competitionData)) {
      return;
    }

    // Prepare the data for the API request
    const dataToSend = {
      name: competitionData.name,
      system: competitionData.winPoints + "/" + competitionData.drawPoints + "/" + competitionData.lossPoints,
      idUser: idUser,
      // competitors are divided by new line, or by ;, don't care about spaces, don't consider empty lines
      competitors: competitionData.competitors.split(/[\n;]/)
          .map((competitor: string) => competitor.trim())
          .filter((competitor: string) => competitor.length > 0),
    };

    
    // get token from auth0 and send data to api
    const sendCompetition = async () => {
      try {
        const token = await getAccessTokenSilently();
        await axios.post(`${config.API_BASE_URL}/api/competition/create`, dataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    };

    sendCompetition();
    
  };
  

  return (
    <>
      <Button onPress={onOpen}>Create new competition</Button>
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
                <Input
                    name="name"
                    value={competitionData.name}
                    onChange={handleInputChange}
                    autoFocus
                    label="Name"
                    placeholder="Enter name of competition"
                    variant="bordered"
                    isInvalid={competitionData.name.length === 0}
                    errorMessage="Name is required"
                />
                <div className="flex gap-4">
                    <Input
                        name="winPoints"
                        value={competitionData.winPoints.toString()}
                        onChange={handleInputChange}
                        label="Win"
                        placeholder="Enter points"
                        type="number"
                        variant="bordered"
                        isInvalid={competitionData.winPoints < 0 || competitionData.winPoints > 100}
                    />
                    <Input
                        name="drawPoints"
                        value={competitionData.drawPoints.toString()}
                        onChange={handleInputChange}
                        label="Draw"
                        placeholder="Enter points"
                        type="number"
                        variant="bordered"
                        isInvalid={competitionData.drawPoints < 0 || competitionData.drawPoints > 100}
                    />
                    <Input
                        name="lossPoints"
                        value={competitionData.lossPoints.toString()}
                        onChange={handleInputChange}
                        label="Loss"
                        placeholder="Enter points"
                        type="number"
                        variant="bordered"
                        isInvalid={competitionData.lossPoints < 0 || competitionData.lossPoints > 100}
                    />
                </div>
                    <Textarea
                        name="competitors"
                        value={competitionData.competitors}
                        onChange={handleInputChange}
                        label="Competitors"
                        placeholder="Enter 4 to 8 competitors, each in a new line or divided by ;"
                        variant="bordered"
                        isInvalid={
                            competitionData.competitors.split(/[\n;]/)
                                .filter((competitor: string) => competitor.length > 0)
                                .length < 4 ||
                            competitionData.competitors.split(/[\n;]/)
                                .filter((competitor: string) => competitor.length > 0)
                                .length > 8
                        }
                        errorMessage="Competitors are required, 4 to 8"
                    />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button onPress={() => {onClose();
                        createCompetition();
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