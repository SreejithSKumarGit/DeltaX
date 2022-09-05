import React from "react";
import ListingPageStyles from "./ListingPage.module.css";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Input,
    Button
  } from "@chakra-ui/react";
  import StarsRating from 'stars-rating';
  import {useNavigate} from "react-router-dom";
import { Navbar } from "../../Components/Navbar/Navbar";

export function ListingPage()
{

    const [songsData,setsongsData]=React.useState([]);
    const [artistsData,setartistsData]=React.useState([]);
    const navigate=useNavigate();
    async function getSongs()
    {
        try {
            const res=await fetch("https://deltax-assignment.herokuapp.com/getSongs");
            const data=await res.json();
            setsongsData(data.songs);
            
        } catch (error) {
            console.log(error);
        }
    }
    async function getArtists()
    {
        try {
            const res=await fetch("https://deltax-assignment.herokuapp.com/getArtists");
            const data=await res.json();
            setartistsData(data.artists);
        } catch (error) {
            console.log(error);
        }
    }
    function handleNavigate()
    {
        navigate("/songsForm")
    }
    React.useEffect(()=>
    {
        getSongs();
        getArtists();
    },[])

    return (
        <>
        <Navbar/>
        <div>
            <div className={ListingPageStyles.songsContainer}>
                <div className={ListingPageStyles.songsHeadingContainer} >
                    <h1 className={ListingPageStyles.heading}>Top 10 Songs</h1>
                    <Button onClick={handleNavigate} colorScheme="blue" >Add Songs</Button>
                </div>
                <TableContainer>
                        <Table variant='striped' colorScheme='blue'>
                            <Thead>
                                <Tr>
                                    <Th>Artwork</Th>
                                    <Th>Song</Th>
                                    <Th>Date of Release</Th>
                                    <Th>Artists</Th>
                                    <Th>Rating</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    songsData?.map((item)=>
                                    (
                                        <Tr key={item._id}>
                                            <Td><img src={item.image} alt="" /></Td>
                                            <Td>{item.title}</Td>
                                            <Td>{item.date_of_release}</Td>
                                            <Td>{item.artists.join(",")}</Td>
                                            <Td><StarsRating count={5} size={24} color2={'#ffd700'} /></Td>
                                        </Tr>
                                    ))
                                }
                            </Tbody>
                        </Table>

                    </TableContainer>

            </div>
            <div className={ListingPageStyles.songsContainer} >
                <div>
                    <h1 className={ListingPageStyles.heading}>Top 10 Artists</h1>
                </div>
                <TableContainer>
                    <Table variant='striped' colorScheme='teal'>
                        <Thead>
                            <Tr>
                                <Th>Artists</Th>
                                <Th>Date of Birth</Th>
                                <Th>Songs</Th> 
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                artistsData?.map((item)=>
                                (
                                    <Tr key={item._id}>
                                        <Td>{item.name}</Td>
                                        <Td>{item.dob}</Td>
                                        <Td>{item.songs.join(" , ")}</Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>

            </div>
        </div>
        </>
    )
}