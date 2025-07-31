import './greeting.css'

export function Greeting({ name }) {

  var nameLength = name.length;

  return (
    <div className="greeting">
      <h2>Hello, {name}!</h2>
      <p>Welcome to our simple React application.</p>
      {nameLength}
    </div>

    
  );
}


