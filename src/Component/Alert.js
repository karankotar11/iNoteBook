// import React from 'react'

// const Alert = (props) => {
//   return (
//     <div>
//        { props.alert && <div className="alert alert-primary" role="alert">
//         <strong>{props.alert.type}</strong> {props.alert.msg}
// </div>}
      
//     </div>
//   )
// }

// export default Alert

import React from 'react'

function Alert(props) {
  return (
    <div className="" style={{height:'50px'}}>
   { props.alert &&  <div>
      <div  className={`alert  alert-success alert-dismissible fade show`} style={{position:'sticky'}} role="alert">
            <strong>{props.alert.type}</strong> {props.alert.msg}
            {/* <button type="button"  className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
        </div>
    </div>}
    </div>
  )
}

export default Alert  
