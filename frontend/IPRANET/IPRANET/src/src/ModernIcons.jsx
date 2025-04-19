// ModernIcons.jsx

const iconStyle = {
    width: 40,
    height: 40,
    transition: 'transform 0.3s',
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
  
  export const ResumeIcon = () => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/10612/10612341.png"
      alt="Icône CV"
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
  
  export const ApprovalIcon = () => (
    <img
      src="https://cdn-icons-png.flaticon.com/512/10612/10612325.png"
      alt="Icône Validation"
      style={iconStyle}
      onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
      onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    />
  );
  