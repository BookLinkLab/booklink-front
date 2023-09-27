import { MembersSVG } from "../../assets/icons/members"
import "./styles.css"

//The part of the amount of users can be modified, I don't know how to do it yet.
const Members = ({ amtOfUsers }) => {
    return (
        <p className="text-members-div body3bold">
            <MembersSVG height={16} width={16} color={"var(--primary-500)"} />
            {amtOfUsers} usuarios
        </p>
    )
}
export default Members
