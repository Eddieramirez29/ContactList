import styles from "./ContactsList.module.css";

function ContactsList()
{
    return(
        <main className={styles.contactContainer}>
            <header className={styles.contactContainer_title}>Contacts List</header>
            <button className={styles.contactContainer_buttonAdd}>+</button>
        </main>
    );
}

export default ContactsList;