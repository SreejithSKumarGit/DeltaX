import React from "react";
import SongsFormStyles from "./SongsForm.module.css";
import { Button } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
  } from '@chakra-ui/react'
import {useNavigate} from "react-router-dom"
import { Navbar } from "../../Components/Navbar/Navbar";

export function SongsForm()
{
    const [songForm,setsongForm]=React.useState({
        title:"",
        date_of_release:"",
        image:"",
        song_rating:0,
        artists:[]
    })
    const [artistForm,setartistForm]=React.useState({
        name:"",
        dob:"",
        bio:"",
        artist_rating:0
    })
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate=useNavigate();
    const [artistsData,setartistsData]=React.useState([]);
    async function getArtists()
    {
        try {
            const res=await fetch("https://deltax-assignment.herokuapp.com/getAllArtists");
            const data=await res.json();
            setartistsData(data.artists);
        } catch (error) {
            console.log(error);
        }
    }
    const handleChange=(e)=>
    {
        const {name,value,type,checked}=e.target;
        if(type!=="checkbox")
        {
            setsongForm({...songForm,[name]:value})
            console.log(songForm)
        }
        else
        {
            if(checked)
            {
                setsongForm({...songForm,artists:[...songForm.artists,name]})
                console.log(songForm)
            }
        }
    }
    const handleArtistChange=(e)=>
    {
        const {name,value}=e.target;
        setartistForm({...artistForm,[name]:value})

    }
    const handleSubmit=()=>
    {
        fetch("https://deltax-assignment.herokuapp.com/addSongs",{
            method:"POST",
            body:JSON.stringify(songForm),
            headers:{"Content-type":"Application/json"}
        })
        setsongForm({
            title:"",
            date_of_release:"",
            image:"",
            artists:[],
            song_rating:"" 
        })
        navigate("/listPage");
    }
    const handleArtistSubmit=()=>
    {
        fetch("https://deltax-assignment.herokuapp.com/addArtists",{
            method:"POST",
            body:JSON.stringify(artistForm),
            headers:{"Content-type":"Application/json"}
        })
        setartistForm({
            name:"",
            dob:"",
            bio:""
        })
        getArtists();
    }
    React.useEffect(()=>
    {
        getArtists();
    },[]);
    const {name,dob,bio,artist_rating}=artistForm;
    const {title,date_of_release,image,song_rating,artists}=songForm;
    return(
        <>
        <Navbar/>
        <div className={SongsFormStyles.Container} >
            <h1 className={SongsFormStyles.heading}>Adding a new Song</h1>
            <form className={SongsFormStyles.FormContainer}>
                <div className={SongsFormStyles.FieldContainer}>
                    <label htmlFor="">Song Name</label>
                    <input 
                        type="text"
                        name="title"
                        value={title}
                        placeholder="Enter the title of the song"
                        onChange={(e)=>(handleChange(e))}
                         />
                </div>
                <div className={SongsFormStyles.FieldContainer}>
                    <label htmlFor="">Date Released</label>
                    <input 
                        type="date"
                        name="date_of_release"
                        value={date_of_release}
                        placeholder="Enter the date of release"
                        onChange={(e)=>(handleChange(e))}
                         />
                </div>
                <div className={SongsFormStyles.FieldContainer}>
                    <label htmlFor="">Image URL</label>
                    <input 
                        type="text"
                        name="image"
                        value={image}
                        placeholder="Enter the image URL"
                        onChange={(e)=>(handleChange(e))}
                         />
                </div>
                <div className={SongsFormStyles.FieldContainer}>
                    <label htmlFor="">Rating</label>
                    <input 
                        type="number"
                        name="song_rating"
                        value={song_rating}
                        placeholder="Avg rating out of 5"
                        onChange={(e)=>(handleChange(e))}
                         />
                </div>
                <div className={SongsFormStyles.FieldContainer}>
                    <label htmlFor="">Artists</label>
                    <div className={SongsFormStyles.CheckboxContainer} >
                        {
                            artistsData?.map((item)=>
                            (
                                <div className={SongsFormStyles.Checkbox}  key={item._id}>
                                    <label htmlFor="">{item.name}</label>
                                    <input 
                                        type="checkbox"
                                        name={item.name}
                                        value={item.name}
                                        onChange={(e)=>(handleChange(e))}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={SongsFormStyles.ButtonContainer} >
                    <Button width="100px" onClick={onOpen} colorScheme='blue' mr={3} >Add Artists</Button>
                </div>
                
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>Add Artist</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <form className={SongsFormStyles.ArtistFormContainer}>
                            <div className={SongsFormStyles.ArtistFieldContainer}>
                                <label htmlFor="">Artist Name</label>
                                <input 
                                    type="text"
                                    name="name"
                                    value={name}
                                    placeholder="Enter the Artist name"
                                    onChange={(e)=>(handleArtistChange(e))}
                                    />
                            </div>
                            <div className={SongsFormStyles.ArtistFieldContainer}>
                                <label htmlFor="">Date of Birth</label>
                                <input 
                                    type="date"
                                    name="dob"
                                    value={dob}
                                    placeholder="Enter the date of birth"
                                    onChange={(e)=>(handleArtistChange(e))}
                                    />
                            </div>
                            <div className={SongsFormStyles.ArtistFieldContainer}>
                                <label htmlFor="">Rating</label>
                                <input 
                                    type="number"
                                    name="artist_rating"
                                    value={artist_rating}
                                    placeholder="Enter the rating"
                                    onChange={(e)=>(handleArtistChange(e))}
                                    />
                            </div>
                            <div className={SongsFormStyles.ArtistFieldContainer}>
                                <label htmlFor="">Bio</label>
                                <textarea 
                                    name="bio"
                                    value={bio}
                                    placeholder="Enter something about the artist"
                                    onChange={(e)=>(handleArtistChange(e))}
                                    cols="35" 
                                    rows="10"></textarea>
                                
                            </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handleArtistSubmit} colorScheme='blue' mr={3}>
                            Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <div className={SongsFormStyles.SongsButtonContainer}>
                    <Button colorScheme='black' border="1px solid grey" mr={3} color="black" onClick={()=>(
                        navigate("/listPage")
                    )}>Cancel</Button>
                    <Button colorScheme='blue' mr={3}  onClick={handleSubmit}>Submit</Button>
                </div>
            </form>
        </div>
        </>
    )
}