import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";


function AddressCard({addressInfo, handleDeleteAddress,handleEditAddress ,setCurrentSelectedAddress,selectedId}) {
   
    return (  
    <Card   className={`cursor-pointer border-red-500 ${selectedId?._id === addressInfo?._id ? 'border-red-900 border-[4px]' : 'border-black' }`} 
       onClick = { setCurrentSelectedAddress? () => setCurrentSelectedAddress(addressInfo) : null}>
        <CardContent className="grid p-4 gap-4">
    <Label className="block">Address: {addressInfo?.address}</Label>
    <Label className="block">City: {addressInfo?.city}</Label>
    <Label className="block">Pincode: {addressInfo?.pincode}</Label>
    <Label className="block">Phone: {addressInfo?.phone}</Label>
    <Label className="block">Notes: {addressInfo?.notes}</Label>
    </CardContent>
    <CardFooter className="p-3 flex justify-between">
       <Button onClick ={() => handleEditAddress(addressInfo) } >Edit</Button>
       <Button onClick ={() => handleDeleteAddress(addressInfo) }>Delete</Button>
    </CardFooter>

    </Card>);
}


export default AddressCard;