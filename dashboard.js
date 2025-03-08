// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Sample data for charts
  const problemsData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
          label: 'Problems Solved',
          data: [25, 35, 40, 50, 65, 75],
          borderColor: '#5eead4',
          backgroundColor: 'rgba(94, 234, 212, 0.1)',
          tension: 0.4,
          fill: true
      }]
  };

  const accuracyData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
          label: 'Accuracy',
          data: [65, 70, 68, 72, 75, 78],
          borderColor: '#8bb8e8',
          backgroundColor: 'rgba(139, 184, 232, 0.1)',
          tension: 0.4,
          fill: true
      }]
  };

  const contestData = {
      labels: ['Gold', 'Silver', 'Bronze', 'Participation'],
      datasets: [{
          data: [3, 5, 8, 12],
          backgroundColor: ['#FFD700', '#C0C0C0', '#CD7F32', '#8bb8e8'],
          borderWidth: 0
      }]
  };

  const difficultyData = {
      labels: ['Easy', 'Medium', 'Hard'],
      datasets: [{
          data: [45, 35, 20],
          backgroundColor: ['#5eead4', '#8bb8e8', '#f472b6'],
          borderWidth: 0
      }]
  };

  const trackerData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
          {
              label: 'Problems Solved',
              data: [4, 7, 5, 6, 8, 10, 3],
              backgroundColor: '#5eead4',
              borderRadius: 4,
              barPercentage: 0.6,
              categoryPercentage: 0.7
          },
          {
              label: 'Time Spent (hours)',
              data: [2, 3, 1.5, 2.5, 3, 4, 1],
              backgroundColor: '#8bb8e8',
              borderRadius: 4,
              barPercentage: 0.6,
              categoryPercentage: 0.7
          }
      ]
  };

  // Create line charts
  createLineChart('problemsChart', problemsData);
  createLineChart('accuracyChart', accuracyData);
  
  // Create pie charts
  createPieChart('contestPieChart', contestData, 'Contest Medals');
  createPieChart('difficultyPieChart', difficultyData, 'Problem Difficulty');
  
  // Create heatmap
  createHeatmap();
  
  // Create tracker chart
  createBarChart('trackerChart', trackerData);
});

// Function to create line charts
function createLineChart(canvasId, data) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
              legend: {
                  display: false
              },
              tooltip: {
                  mode: 'index',
                  intersect: false,
                  backgroundColor: '#242535',
                  titleColor: '#ffffff',
                  bodyColor: '#b4b7c5',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderWidth: 1
              }
          },
          scales: {
              x: {
                  display: false
              },
              y: {
                  display: false,
                  beginAtZero: true
              }
          },
          elements: {
              point: {
                  radius: 0
              }
          }
      }
  });
}

// Function to create pie charts
function createPieChart(canvasId, data, title) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
              legend: {
                  position: 'right',
                  labels: {
                      color: '#b4b7c5',
                      font: {
                          size: 12
                      },
                      padding: 10
                  }
              },
              title: {
                  display: true,
                  text: title,
                  color: '#b4b7c5',
                  font: {
                      size: 14
                  },
                  padding: {
                      bottom: 15
                  }
              },
              tooltip: {
                  backgroundColor: '#242535',
                  titleColor: '#ffffff',
                  bodyColor: '#b4b7c5',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderWidth: 1
              }
          },
          cutout: '70%'
      }
  });
}

// Function to create bar chart
function createBarChart(canvasId, data) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
              legend: {
                  position: 'top',
                  align: 'end',
                  labels: {
                      color: '#b4b7c5',
                      font: {
                          size: 12
                      },
                      padding: 10,
                      boxWidth: 12,
                      boxHeight: 12
                  }
              },
              tooltip: {
                  backgroundColor: '#242535',
                  titleColor: '#ffffff',
                  bodyColor: '#b4b7c5',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderWidth: 1
              }
          },
          scales: {
              x: {
                  grid: {
                      display: false,
                      drawBorder: false
                  },
                  ticks: {
                      color: '#b4b7c5',
                      font: {
                          size: 10
                      }
                  }
              },
              y: {
                  grid: {
                      color: 'rgba(255, 255, 255, 0.05)',
                      drawBorder: false
                  },
                  ticks: {
                      color: '#b4b7c5',
                      font: {
                          size: 10
                      },
                      stepSize: 2
                  }
              }
          }
      }
  });
}

// Function to create heatmap
function createHeatmap() {
  const heatmapContainer = document.getElementById('heatmap');
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  document.body.appendChild(tooltip);
  
  // Generate random data for the heatmap
  for (let week = 0; week < 26; week++) {
      for (let day = 0; day < 7; day++) {
          const cell = document.createElement('div');
          cell.className = 'heatmap-cell';
          
          // Random activity level between 0-4
          const activityLevel = Math.floor(Math.random() * 5);
          
          // Set color based on activity level
          if (activityLevel === 0) {
              cell.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
          } else if (activityLevel === 1) {
              cell.style.backgroundColor = 'rgba(94, 234, 212, 0.2)';
          } else if (activityLevel === 2) {
              cell.style.backgroundColor = 'rgba(94, 234, 212, 0.4)';
          } else if (activityLevel === 3) {
              cell.style.backgroundColor = 'rgba(94, 234, 212, 0.6)';
          } else {
              cell.style.backgroundColor = 'rgba(94, 234, 212, 0.8)';
          }
          
          // Add tooltip on hover
          cell.addEventListener('mouseover', function(e) {
              const date = new Date();
              date.setDate(date.getDate() - ((25 - week) * 7 + (6 - day)));
              const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              
              tooltip.innerHTML = `
                  <div>${days[day]}, ${formattedDate}</div>
                  <div>${activityLevel} ${activityLevel === 1 ? 'contribution' : 'contributions'}</div>
              `;
              tooltip.style.left = `${e.pageX + 10}px`;
              tooltip.style.top = `${e.pageY + 10}px`;
              tooltip.style.opacity = '1';
          });
          
          cell.addEventListener('mouseout', function() {
              tooltip.style.opacity = '0';
          });
          
          heatmapContainer.appendChild(cell);
      }
  }
}