import './AdminHeadSection.css'
import plusSign from '../../../assets/Images/plus.png'
import userIcon from '../../../assets/Images/userIcon.png'
function adminHeadSection(props){
    return(
        <div className="adminHeadSection">
            <div className="row mainHead gap-4">
                <div className="left col-8 row gap-2">
                  <div className="totalMovie col-5 bgImage"> <p>Total Movies {props.movies}</p></div>
                    <div className="totalUser col-5 bgImage"><p>Total Users {props.users}</p></div>
                </div>
                <div className="right col-4">
                   <button> Add Movie <img className="ms-5" src={plusSign} alt="plusSign"/></button>
                    <button>Add User <img className="ms-5" src={userIcon} alt="plusSign"/></button>
                </div>
            </div>
        </div>
    )
}
export default adminHeadSection;