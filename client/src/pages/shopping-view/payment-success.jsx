import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";


function PaymentSuccess() {
    const navigate = useNavigate();


    return ( 
          <Card  classname="p-10">
             <CardHeader  classname="p-0">
               <CardTitle classname="text-4xl">Payment is Successful</CardTitle>
             </CardHeader>
             <Button
              onClick={ () => navigate('/shop/account')} 
              classname="mt-5">
                view orders
             </Button>
          </Card> );
}

export default PaymentSuccess;
