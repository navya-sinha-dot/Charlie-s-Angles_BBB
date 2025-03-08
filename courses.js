document.addEventListener('DOMContentLoaded', function() {
    // Course filtering functionality
    const filterButtons = document.querySelectorAll('.filter-item');
    const courseCards = document.querySelectorAll('.course-card');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Update active filter button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        // Filter the courses
        courseCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'flex';
            // Optional: Add animation for appearing cards
            anime({
              targets: card,
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 500,
              easing: 'easeOutQuad'
            });
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
    
    // Course Modal Functionality
    const modal = document.getElementById('courseModal');
    const playButtons = document.querySelectorAll('.play-btn');
    const learnButtons = document.querySelectorAll('.learn-btn');
    const closeModal = document.querySelector('.close-modal');
    const modalTabs = document.querySelectorAll('.modal-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const modalTitle = document.getElementById('modalTitle');
    
    // Function to open modal with correct content
    function openModal(courseTitle, activeTab = 'story') {
      modalTitle.textContent = courseTitle;
      modal.style.display = 'flex';
      
      // Set correct tab active
      modalTabs.forEach(tab => {
        if (tab.getAttribute('data-tab') === activeTab) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });
      
      // Show correct tab content
      tabContents.forEach(content => {
        if (content.id === activeTab + 'Tab') {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
      
      // Animate modal opening
      anime({
        targets: '.modal-content',
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
      });
    }
    
    // Play button event
    playButtons.forEach(button => {
      button.addEventListener('click', function() {
        const courseCard = this.closest('.course-card');
        const courseTitle = courseCard.querySelector('h3').textContent;
        openModal(courseTitle, 'play');
      });
    });
    
    // Learn button event
    learnButtons.forEach(button => {
      button.addEventListener('click', function() {
        const courseCard = this.closest('.course-card');
        const courseTitle = courseCard.querySelector('h3').textContent;
        openModal(courseTitle, 'learn');
      });
    });
    
    // Close modal event
    closeModal.addEventListener('click', function() {
      anime({
        targets: '.modal-content',
        scale: [1, 0.9],
        opacity: [1, 0],
        duration: 200,
        easing: 'easeInQuad',
        complete: function() {
          modal.style.display = 'none';
        }
      });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        anime({
          targets: '.modal-content',
          scale: [1, 0.9],
          opacity: [1, 0],
          duration: 200,
          easing: 'easeInQuad',
          complete: function() {
            modal.style.display = 'none';
          }
        });
      }
    });
    
    // Tab switching in modal
    modalTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Update active tab
        modalTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        const tabId = this.getAttribute('data-tab') + 'Tab';
        
        // Show selected tab content
        tabContents.forEach(content => {
          content.classList.remove('active');
          if (content.id === tabId) {
            content.classList.add('active');
            
            // Animate tab content
            anime({
              targets: '#' + tabId,
              opacity: [0, 1],
              translateX: [20, 0],
              duration: 300,
              easing: 'easeOutQuad'
            });
          }
        });
      });
    });
    
    // Next lesson button
    const nextLessonBtn = document.getElementById('nextLesson');
    let currentLesson = 0;
    const totalLessons = 5;
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    
    nextLessonBtn.addEventListener('click', function() {
      if (currentLesson < totalLessons) {
        currentLesson++;
        
        // Update progress bar and text
        const progress = (currentLesson / totalLessons) * 100;
        progressBar.style.width = progress + '%';
        progressText.textContent = currentLesson + '/' + totalLessons + ' Lessons Completed';
        
        // Change button text if all lessons completed
        if (currentLesson === totalLessons) {
          nextLessonBtn.textContent = 'Complete Course';
        } else if (currentLesson === 1) {
          nextLessonBtn.textContent = 'Next Lesson';
        }
      } else {
        // Course completed
        modal.style.display = 'none';
        currentLesson = 0;
        progressBar.style.width = '0%';
        progressText.textContent = '0/' + totalLessons + ' Lessons Completed';
        nextLessonBtn.textContent = 'Start Lesson';
        
        // You could show a completion modal or message here
        alert('Congratulations! You have completed this course!');
      }
    });
    
    // Game functionality for the bubble sort game
    const resetGameBtn = document.getElementById('resetGame');
    const checkAnswerBtn = document.getElementById('checkAnswer');
    const numbers = document.querySelectorAll('.number');
    let selectedNumber = null;
    
    // Initial setup for the game
    function initializeGame() {
      // Reset selection
      selectedNumber = null;
      numbers.forEach(num => {
        num.classList.remove('selected');
        num.classList.remove('correct');
      });
      
      // Shuffle numbers
      const container = document.querySelector('.number-container');
      const numberElements = Array.from(numbers);
      
      // Randomize order
      for (let i = numberElements.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        container.insertBefore(numberElements[j], numberElements[i]);
      }
    }
    
    // Number click event for swapping
    numbers.forEach(number => {
      number.addEventListener('click', function() {
        if (!selectedNumber) {
          // First number selected
          selectedNumber = this;
          this.classList.add('selected');
        } else if (this === selectedNumber) {
          // Deselect if clicking the same number
          selectedNumber.classList.remove('selected');
          selectedNumber = null;
        } else {
          // Second number selected, perform swap if adjacent
          const container = document.querySelector('.number-container');
          const allNumbers = Array.from(container.children);
          const firstIndex = allNumbers.indexOf(selectedNumber);
          const secondIndex = allNumbers.indexOf(this);
          
          if (Math.abs(firstIndex - secondIndex) === 1) {
            // Swap the numbers
            if (firstIndex < secondIndex) {
              container.insertBefore(this, selectedNumber);
            } else {
              container.insertBefore(selectedNumber, this.nextSibling);
            }
            
            // Animation for the swap
            anime({
              targets: [selectedNumber, this],
              scale: [1, 1.1, 1],
              duration: 300,
              easing: 'easeInOutQuad'
            });
          }
          
          // Reset selection
          selectedNumber.classList.remove('selected');
          selectedNumber = null;
        }
      });
    });
    
    // Reset game button
    resetGameBtn.addEventListener('click', initializeGame);
    
    // Check answer button
    checkAnswerBtn.addEventListener('click', function() {
      const container = document.querySelector('.number-container');
      const currentNumbers = Array.from(container.children);
      let isCorrect = true;
      
      // Check if numbers are in ascending order
      for (let i = 0; i < currentNumbers.length - 1; i++) {
        const current = parseInt(currentNumbers[i].textContent);
        const next = parseInt(currentNumbers[i + 1].textContent);
        
        if (current > next) {
          isCorrect = false;
          break;
        }
      }
      
      if (isCorrect) {
        // Success animation
        currentNumbers.forEach(num => {
          num.classList.add('correct');
        });
        
        anime({
          targets: '.number.correct',
          scale: [1, 1.2, 1],
          backgroundColor: ['#fff', '#4CAF50', '#fff'],
          delay: anime.stagger(100),
          duration: 500,
          easing: 'easeInOutQuad'
        });
        
        setTimeout(() => {
          alert('Great job! You\'ve sorted the numbers correctly!');
        }, 1000);
      } else {
        // Failure animation
        anime({
          targets: '.number-container',
          translateX: [0, -10, 10, -10, 10, 0],
          duration: 400,
          easing: 'easeInOutQuad'
        });
      }
    });
    
    // Initialize the sorting game on load
    initializeGame();
  });