import Layout from "../components/Layout";
import ExpenseForm from "../components/ExpenseForm";
import { useParams } from "react-router-dom";

function AddExpense() {
    const {id} = useParams();
    const isEdit = !!id;
    return (
        <Layout>
            <ExpenseForm isEdit={isEdit} transactionId={id}/>
        </Layout>
    );
}

export default AddExpense;