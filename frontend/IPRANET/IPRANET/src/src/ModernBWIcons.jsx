// ModernBWIcons.jsx

const iconStyle = {
    width: 40,
    height: 40,
    filter: 'grayscale(100%)', // noir et blanc assuré
    transition: 'transform 0.3s ease',
  };
  
  export const UserIcon = () => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/10612/10612324.png"
      alt="Icône Utilisateur"
      style={iconStyle}
      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    />
  );
  
  export const DocumentIcon = () => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/10612/10612336.png"
      alt="Icône Document"
      style={iconStyle}
      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    />
  );
  
  export const InterviewIcon = () => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/10612/10612331.png"
      alt="Icône Entretien"
      style={iconStyle}
      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    />
  );
  
  export const ValidationIcon = () => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/10612/10612325.png"
      alt="Icône Validation"
      style={iconStyle}
      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    />
  );
  