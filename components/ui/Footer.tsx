export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="page-padding py-10 mt-8 border-t border-primary/10">
      <p className="text-sm text-primary/50 text-center tracking-wide">
        © Jan Overhaus &nbsp; {year}
      </p>
    </footer>
  );
}
