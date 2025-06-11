interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  // Você pode adicionar props personalizadas aqui se precisar
  // exemplo: variant?: 'primary' | 'secondary';
}

export default function Footer({ ...props }: FooterProps) {
  return (
    <footer className="text-center py-10 pt-20" {...props}>
      <div className="container">
        <p>
          Desenvolvido com 💙 por <b>Kelvin Costa</b>
        </p>
      </div>
    </footer>
  );
}
