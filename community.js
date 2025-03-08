document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const createCommunityBtn = document.querySelector('.create-community-btn');
    const modal = document.getElementById('createCommunityModal');
    const closeModal = document.querySelector('.close-modal');
    const joinBtn = document.querySelector('.join-btn');
    const voteButtons = document.querySelectorAll('.vote-btn');
    const filterItems = document.querySelectorAll('.filter-item');
    const communityItems = document.querySelectorAll('.community-item');
    const postBtn = document.querySelector('.post-btn');
    const postInput = document.querySelector('.post-input input');
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-container input');
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    const pageNumbers = document.querySelectorAll('.page-number');
    const actionButtons = document.querySelectorAll('.action-btn');
    const createCommunityForm = document.getElementById('createCommunityForm');
    
    // Add CSS to fix modal overflow issues
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
      .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
        z-index: 1000;
        padding: 20px;
        box-sizing: border-box;
        overflow-y: auto;
      }
      
      .modal-content {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        width: 100%;
        max-width: 500px;
        padding: 25px;
        position: relative;
        max-height: 80vh;
        overflow-y: auto;
      }
      
      .close-modal {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 24px;
        cursor: pointer;
        z-index: 10;
      }
      
      #createCommunityForm {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
      
      .form-group {
        margin-bottom: 5px;
      }
      
      .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: 500;
      }
      
      .form-group input[type="text"],
      .form-group textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-sizing: border-box;
      }
      
      .form-group input[type="file"] {
        width: 100%;
        padding: 8px 0;
      }
      
      .radio-group {
        display: flex;
        gap: 15px;
      }
      
      .radio-group label {
        display: flex;
        align-items: center;
        font-weight: normal;
        cursor: pointer;
      }
      
      .radio-group input[type="radio"] {
        margin-right: 5px;
      }
      
      .create-btn {
        background-color: #1e88e5;
        color: white;
        border: none;
        padding: 12px;
        border-radius: 4px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      
      .create-btn:hover {
        background-color: #1565c0;
      }
      
      @media (max-width: 768px) {
        .modal-content {
          padding: 15px;
          max-height: 85vh;
        }
        
        .radio-group {
          flex-direction: column;
          gap: 5px;
        }
      }
    `;
    document.head.appendChild(modalStyle);
    
    // Modal functionality
    if (createCommunityBtn) {
      createCommunityBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        // Animation for modal opening
        anime({
          targets: '.modal-content',
          scale: [0.8, 1],
          opacity: [0, 1],
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
    }
    
    if (closeModal) {
      closeModal.addEventListener('click', function() {
        closeModalFunction();
      });
    }
    
    // Close modal if clicked outside of content
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        closeModalFunction();
      }
    });
    
    // Function to close modal with animation
    function closeModalFunction() {
      anime({
        targets: '.modal-content',
        scale: [1, 0.8],
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInQuad',
        complete: function() {
          modal.style.display = 'none';
          document.body.style.overflow = ''; // Restore background scrolling
        }
      });
    }
    
    // Join/Leave community button
    if (joinBtn) {
      joinBtn.addEventListener('click', function() {
        if (joinBtn.classList.contains('joined')) {
          joinBtn.textContent = 'Join';
          joinBtn.classList.remove('joined');
        } else {
          joinBtn.textContent = 'Joined';
          joinBtn.classList.add('joined');
          
          // Show confirmation message
          const notification = document.createElement('div');
          notification.className = 'notification';
          notification.textContent = 'You have joined Beginner Coders!';
          document.body.appendChild(notification);
          
          setTimeout(() => {
            anime({
              targets: notification,
              opacity: [1, 0],
              translateY: [0, -20],
              duration: 500,
              easing: 'easeOutQuad',
              complete: function() {
                notification.remove();
              }
            });
          }, 2000);
          
          anime({
            targets: notification,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 500,
            easing: 'easeOutQuad'
          });
        }
      });
    }
    
    // Voting functionality
    voteButtons.forEach(button => {
      button.addEventListener('click', function() {
        const voteCount = this.parentElement.querySelector('.vote-count');
        let count = parseInt(voteCount.textContent);
        
        if (this.classList.contains('up')) {
          if (this.classList.contains('active')) {
            count--;
            this.classList.remove('active');
          } else {
            count++;
            this.classList.add('active');
            const downButton = this.parentElement.querySelector('.down');
            if (downButton.classList.contains('active')) {
              count++;
              downButton.classList.remove('active');
            }
          }
        } else {
          if (this.classList.contains('active')) {
            count++;
            this.classList.remove('active');
          } else {
            count--;
            this.classList.add('active');
            const upButton = this.parentElement.querySelector('.up');
            if (upButton.classList.contains('active')) {
              count--;
              upButton.classList.remove('active');
            }
          }
        }
        
        voteCount.textContent = count;
        
        // Animation for vote count
        anime({
          targets: voteCount,
          scale: [1.2, 1],
          duration: 300,
          easing: 'easeOutQuad'
        });
      });
    });
    
    // Filter items functionality
    filterItems.forEach(item => {
      item.addEventListener('click', function() {
        filterItems.forEach(fi => fi.classList.remove('active'));
        this.classList.add('active');
        
        // Simulate loading new content
        const discussionList = document.querySelector('.discussion-list');
        if (discussionList) {
          discussionList.style.opacity = '0.5';
          setTimeout(() => {
            discussionList.style.opacity = '1';
          }, 500);
        }
      });
    });
    
    // Community item selection
    communityItems.forEach(item => {
      item.addEventListener('click', function() {
        communityItems.forEach(ci => ci.classList.remove('active'));
        this.classList.add('active');
        
        // Simulate loading community
        const communityMain = document.querySelector('.community-main');
        if (communityMain) {
          communityMain.style.opacity = '0.5';
          setTimeout(() => {
            communityMain.style.opacity = '1';
            const communityName = document.querySelector('.community-text h2');
            if (communityName) {
              communityName.textContent = this.querySelector('span:not(.member-count)').textContent;
            }
          }, 500);
        }
      });
    });
    
    // Post functionality
    if (postBtn && postInput) {
      postBtn.addEventListener('click', function() {
        const content = postInput.value.trim();
        if (content) {
          // Create new discussion card
          const newPost = createDiscussionCard({
            username: 'You',
            time: 'Just now',
            title: content,
            text: '',
            votes: 1,
            comments: 0,
            tags: ['New']
          });
          
          // Add to discussion list
          const discussionList = document.querySelector('.discussion-list');
          if (discussionList) {
            discussionList.insertBefore(newPost, discussionList.firstChild);
            
            // Animate new post
            anime({
              targets: newPost,
              translateY: [20, 0],
              opacity: [0, 1],
              duration: 500,
              easing: 'easeOutQuad'
            });
            
            // Clear input
            postInput.value = '';
          }
        }
      });
    }
    
    // Search functionality
    if (searchBtn && searchInput) {
      searchBtn.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
          // Simulate search
          const discussionList = document.querySelector('.discussion-list');
          if (discussionList) {
            discussionList.style.opacity = '0.5';
            setTimeout(() => {
              discussionList.style.opacity = '1';
              
              // Show search results notification
              const notification = document.createElement('div');
              notification.className = 'notification';
              notification.textContent = `Search results for "${query}"`;
              document.body.appendChild(notification);
              
              setTimeout(() => {
                anime({
                  targets: notification,
                  opacity: [1, 0],
                  translateY: [0, -20],
                  duration: 500,
                  easing: 'easeOutQuad',
                  complete: function() {
                    notification.remove();
                  }
                });
              }, 2000);
              
              anime({
                targets: notification,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 500,
                easing: 'easeOutQuad'
              });
            }, 500);
          }
        }
      });
      
      // Search on Enter key
      searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
          searchBtn.click();
        }
      });
    }
    
    // Pagination functionality
    pageNumbers.forEach(page => {
      page.addEventListener('click', function() {
        pageNumbers.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        
        // Simulate loading page
        const discussionList = document.querySelector('.discussion-list');
        if (discussionList) {
          discussionList.style.opacity = '0.5';
          setTimeout(() => {
            discussionList.style.opacity = '1';
          }, 500);
        }
      });
    });
    
    paginationButtons.forEach(button => {
      if (!button.disabled) {
        button.addEventListener('click', function() {
          const activePage = document.querySelector('.page-number.active');
          if (activePage) {
            let currentIndex = Array.from(pageNumbers).indexOf(activePage);
            let nextIndex;
            
            if (this.textContent === 'Next' && currentIndex < pageNumbers.length - 1) {
              nextIndex = currentIndex + 1;
            } else if (this.textContent === 'Previous' && currentIndex > 0) {
              nextIndex = currentIndex - 1;
            }
            
            if (nextIndex !== undefined) {
              pageNumbers[currentIndex].classList.remove('active');
              pageNumbers[nextIndex].classList.add('active');
              
              // Update disabled state
              document.querySelector('.pagination-btn:first-child').disabled = nextIndex === 0;
              document.querySelector('.pagination-btn:last-child').disabled = nextIndex === pageNumbers.length - 1;
              
              // Simulate loading page
              const discussionList = document.querySelector('.discussion-list');
              if (discussionList) {
                discussionList.style.opacity = '0.5';
                setTimeout(() => {
                  discussionList.style.opacity = '1';
                }, 500);
              }
            }
          }
        });
      }
    });
    
    // Action buttons (comment, save, share)
    actionButtons.forEach(button => {
      button.addEventListener('click', function() {
        const action = this.textContent.trim().split(' ')[0];
        
        if (action.includes('Comments')) {
          // Simulate opening comments
          alert('Comments section would open here');
        } else if (action.includes('Save')) {
          if (this.classList.contains('saved')) {
            this.classList.remove('saved');
            this.innerHTML = '<span class="action-icon">🔖</span> Save';
          } else {
            this.classList.add('saved');
            this.innerHTML = '<span class="action-icon">✓</span> Saved';
          }
        } else if (action.includes('Share')) {
          // Simulate share functionality
          alert('Share options would appear here');
        }
      });
    });
    
    // Form submission for new community
    if (createCommunityForm) {
      createCommunityForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate community creation
        const communityName = document.getElementById('communityName').value;
        
        // Close modal with animation
        anime({
          targets: '.modal-content',
          scale: [1, 0.8],
          opacity: [1, 0],
          duration: 300,
          easing: 'easeInQuad',
          complete: function() {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore background scrolling
            
            // Show success notification
            const notification = document.createElement('div');
            notification.className = 'notification success';
            notification.textContent = `Community "${communityName}" created successfully!`;
            document.body.appendChild(notification);
            
            setTimeout(() => {
              anime({
                targets: notification,
                opacity: [1, 0],
                translateY: [0, -20],
                duration: 500,
                easing: 'easeOutQuad',
                complete: function() {
                  notification.remove();
                }
              });
            }, 3000);
            
            anime({
              targets: notification,
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 500,
              easing: 'easeOutQuad'
            });
            
            // Reset form
            createCommunityForm.reset();
          }
        });
      });
    }
    
    // Helper function to create discussion cards
    function createDiscussionCard(data) {
      const card = document.createElement('div');
      card.className = 'discussion-card';
      
      const votesHtml = `
        <div class="discussion-votes">
          <button class="vote-btn up active">▲</button>
          <span class="vote-count">${data.votes}</span>
          <button class="vote-btn down">▼</button>
        </div>
      `;
      
      const tagsHtml = data.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
      
      const contentHtml = `
        <div class="discussion-content">
          <div class="discussion-header">
            <div class="user-info">
              <img src="https://picsum.photos/seed/user/30/30" alt="User Avatar">
              <span class="username">${data.username}</span>
            </div>
            <span class="post-time">${data.time}</span>
          </div>
          <h3 class="discussion-title">${data.title}</h3>
          <p class="discussion-text">${data.text}</p>
          <div class="discussion-tags">
            ${tagsHtml}
          </div>
          <div class="discussion-actions">
            <button class="action-btn">
              <span class="action-icon">💬</span> ${data.comments} Comments
            </button>
            <button class="action-btn">
              <span class="action-icon">🔖</span> Save
            </button>
            <button class="action-btn">
              <span class="action-icon">🔄</span> Share
            </button>
          </div>
        </div>
      `;
      
      card.innerHTML = votesHtml + contentHtml;
      
      // Add event listeners to the new buttons
      const newVoteButtons = card.querySelectorAll('.vote-btn');
      newVoteButtons.forEach(button => {
        button.addEventListener('click', function() {
          const voteCount = this.parentElement.querySelector('.vote-count');
          let count = parseInt(voteCount.textContent);
          
          if (this.classList.contains('up')) {
            if (this.classList.contains('active')) {
              count--;
              this.classList.remove('active');
            } else {
              count++;
              this.classList.add('active');
              const downButton = this.parentElement.querySelector('.down');
              if (downButton.classList.contains('active')) {
                count++;
                downButton.classList.remove('active');
              }
            }
          } else {
            if (this.classList.contains('active')) {
              count++;
              this.classList.remove('active');
            } else {
              count--;
              this.classList.add('active');
              const upButton = this.parentElement.querySelector('.up');
              if (upButton.classList.contains('active')) {
                count--;
                upButton.classList.remove('active');
              }
            }
          }
          
          voteCount.textContent = count;
        });
      });
      
      const newActionButtons = card.querySelectorAll('.action-btn');
      newActionButtons.forEach(button => {
        button.addEventListener('click', function() {
          const action = this.textContent.trim().split(' ')[0];
          
          if (action.includes('Comments')) {
            // Simulate opening comments
            alert('Comments section would open here');
          } else if (action.includes('Save')) {
            if (this.classList.contains('saved')) {
              this.classList.remove('saved');
              this.innerHTML = '<span class="action-icon">🔖</span> Save';
            } else {
              this.classList.add('saved');
              this.innerHTML = '<span class="action-icon">✓</span> Saved';
            }
          } else if (action.includes('Share')) {
            // Simulate share functionality
            alert('Share options would appear here');
          }
        });
      });
      
      return card;
    }
  
    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
      .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        opacity: 0;
      }
      
      .notification.success {
        background-color: #4CAF50;
      }
      
      .notification.error {
        background-color: #f44336;
      }
      
      .action-btn.saved {
        color: #4CAF50;
      }
      
      .vote-btn.active.up {
        color: #FF4500;
      }
      
      .vote-btn.active.down {
        color: #9494FF;
      }
    `;
    document.head.appendChild(style);
  });