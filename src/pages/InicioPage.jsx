function InicioPage() {
  const Author = import.meta.env.VITE_AUTHOR;

  //const API_BASE_URL = import.meta.env.VITE_API_URL;
  console.log(Author);
  return (
    <div>
      <h1>Sistema de gestión</h1>
      <p>Creado por: {import.meta.env.VITE_AUTHOR}</p>
    </div>
  );
}

export default InicioPage;