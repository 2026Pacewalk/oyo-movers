import { getCustomerNotifications } from "@/lib/serverAction";
import { Container } from "react-bootstrap";
import "./notification.scss";
import moment from "moment";
import EmptyState from "@/components/EmptyState";



const Notification = async () => {

  const notification = await getCustomerNotifications();
  
  return (
    <Container>
    <div className="notificationWrapper">
      <h2>Notification</h2>
      <div className="notificationContainer">
       {notification?.length ? notification.reverse().map((item:any)=>  <div key={item._id}className="notificationWrapper__inner ">
          <div className="notificationWrapper__inner__card">
            <div className="d-flex align-items-center justify-content-between notificationCard">
              <h4>{item?.messageTitle}</h4>
              <h5>{moment(item.createdAt).format('DD MMM, YYYY [at] h:mm a')}</h5>
            </div>
            <p>
              {item?.message}
            </p>
          </div>
        </div>):<EmptyState />}
        
      </div>
    </div>
  </Container>
  )
}

export default Notification
