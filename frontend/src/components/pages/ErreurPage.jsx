import MainNavigation from "../navigation/MainNavigation";

const ErreurPage = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <h1>Erreur 404</h1>
        <p>La page que vous recherchez n'est pas disponible.</p>
      </main>
    </>
  );
};
export default ErreurPage;
