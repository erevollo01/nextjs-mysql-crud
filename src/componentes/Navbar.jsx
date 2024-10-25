function Navbar() {
  return (
    <nav className="bg-teal-800 py-4 mb-4">
      {" "}
      {/* Cambia el color aquí */}
      <div className="container mx-auto flex justify-between items-center px-4">
        <a href="/">
          <h3 className="text-2xl font-bold text-white">NextMySQL</h3>
        </a>
        <ul className="flex space-x-6 ml-auto">
          {" "}
          {/* Espacio entre elementos */}
          <li>
            <a
              href="/new"
              className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition"
            >
              New
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
