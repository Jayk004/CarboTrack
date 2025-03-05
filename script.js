document.getElementById("calculateBtn").addEventListener("click", function() {
  const period = document.getElementById("period").value;
  
  let transport = parseFloat(document.getElementById("transport").value) || 0;
  let electricity = parseFloat(document.getElementById("electricity").value) || 0;
  let meat = parseFloat(document.getElementById("meat").value) || 0;
  let flights = parseFloat(document.getElementById("flights").value) || 0;
  let waste = parseFloat(document.getElementById("waste").value) || 0;
  let water = parseFloat(document.getElementById("water").value) || 0;
  let shopping = parseFloat(document.getElementById("shopping").value) || 0;

  let factor = getFactor(period);

  let totalCarbon = (transport * 0.2 + electricity * 0.5 + meat * 1.8 +
                     flights * 250 + waste * 0.9 + water * 0.002 + shopping * 0.5) * factor;
  
  document.getElementById("result").innerHTML = `Your estimated ${period} carbon footprint is <strong>${totalCarbon.toFixed(2)}</strong> kg CO₂.`;
  
  provideSuggestions(totalCarbon);
  updateChart(totalCarbon, period);
});

function getFactor(period) {
  switch (period) {
      case "daily": return 1;
      case "weekly": return 7;
      case "monthly": return 30;
      case "yearly": return 365;
      default: return 1;
  }
}

function provideSuggestions(carbon) {
  let tips = document.getElementById("tips");
  if (carbon > 10000) {
      tips.innerHTML = "<strong>Try to reduce your footprint!</strong> Consider using public transport, reducing waste, and eating less meat.";
  } else if (carbon > 5000) {
      tips.innerHTML = "<strong>Good effort!</strong> You can improve further by conserving energy and reducing travel emissions.";
  } else {
      tips.innerHTML = "<strong>Great job!</strong> Keep up the eco-friendly habits.";
  }
}

function updateUnits() {
  const period = document.getElementById("period").value;
  document.getElementById("transport-unit").textContent = `km per ${period}`;
  document.getElementById("electricity-unit").textContent = `kWh per ${period}`;
  document.getElementById("meat-unit").textContent = `kg per ${period}`;
  document.getElementById("waste-unit").textContent = `kg per ${period}`;
  document.getElementById("water-unit").textContent = `liters per ${period}`;
  document.getElementById("shopping-unit").textContent = `items per ${period}`;
}

function updateChart(userCarbon, period) {
  const indiaCarbon = { daily: 5.2, weekly: 36.5, monthly: 158.3, yearly: 1900 };
  
  let ctx = document.getElementById("chart").getContext("2d");
  if (window.myChart) {
      window.myChart.destroy();
  }
  window.myChart = new Chart(ctx, {
      type: "bar",
      data: {
          labels: ["Your Footprint", "India Average"],
          datasets: [{
              label: `Carbon Footprint (kg CO₂) - ${period}`,
              data: [userCarbon, indiaCarbon[period]],
              backgroundColor: ["#4CAF50", "#FFD700"]
          }]
      }
  });
}
