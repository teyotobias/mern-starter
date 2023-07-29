import './OrderHistoryPage.css';
import { checkToken } from '../../utilities/users-service'
export default function OrderHistoryPage() {
  async function handleCheckToken() {
    //should have try catch in it
    //but it will be stripped
    const expDate = await checkToken();
    console.log(expDate);
  }
  return (
    <>
    <h1>Order History Page</h1>
    <button onClick={handleCheckToken}>Check When My Login Expires</button>
    </>
  );
}