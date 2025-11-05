function CustomAlert({ message, onClose }) {
  return (
    <div style={overlay}>
      <div style={box}>
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

export default CustomAlert;
const overlay = {
  position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
  background: 'rgba(0,0,0,0.4)', display: 'flex',
  alignItems: 'center', justifyContent: 'center'
};
const box = {
  background: '#1e0d0dff', padding: '20px 30px', borderRadius: '8px', textAlign: 'center'
};
