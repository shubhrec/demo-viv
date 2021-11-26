import './App.css';
import ForecastChart from './components/ForecastChart';
import HeaderSection from './components/HeaderSection'
import SideNav from './components/SideNav'

function App() {
  return (
    <div className="App">
      <HeaderSection />
      <div className="main-grid">
        <section id = "side-nav-container">
          <SideNav />

        </section>
        <section className="tall-section">
          <ForecastChart />

        </section>
      </div>
      {/* <ForecastChart/> */}
    </div>
  );
}

export default App;
