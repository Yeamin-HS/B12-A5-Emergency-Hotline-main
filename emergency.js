 
        let coinCount = 100;
        let copyCount = 0;
        let callHistory = [];
        let heartCount = 0;

        // Update display counters
        function updateCounters() {
            document.getElementById('heartCount').textContent = heartCount;
            document.getElementById('coinCount').textContent = coinCount;
            document.getElementById('copyCount').textContent = copyCount;
        }

        // Heart button functionality
        // Heart button functionality (modified)
            document.querySelectorAll('.heart-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const heartImg = this.querySelector('img');
        if (heartImg.getAttribute('src').includes('heart-logo2.png')) {
            // Change to red heart
            heartImg.setAttribute('src', 'assets/heart.png');
            heartCount++;
        } else {
            // Change back to default heart
            
            heartCount++;
        }
        updateCounters();
    });
});


        // Copy button functionality
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const number = this.dataset.number;
                navigator.clipboard.writeText(number).then(() => {
                    copyCount++;
                    updateCounters();
                    alert(`Number ${number} copied to clipboard!`);
                }).catch(() => {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = number;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    copyCount++;
                    updateCounters();
                    alert(`Number ${number} copied to clipboard!`);
                });
            });
        });

        // Call button functionality
        document.querySelectorAll('.call-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const serviceName = this.dataset.service;
                const number = this.dataset.number;

                if (coinCount < 20) {
                    alert('Insufficient coins! You need at least 20 coins to make a call.');
                    return;
                }

                // Deduct coins
                coinCount -= 20;
                updateCounters();

                // Show call alert
                alert(`Calling ${serviceName} at ${number}`);

                // Add to call history with timestamp
                const now = new Date();
                const time = now.toLocaleTimeString('en-US', { 
                    hour12: true, 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });

                const historyItem = {
                    service: serviceName,
                    number: number,
                    time: time
                };

                callHistory.unshift(historyItem);
                updateCallHistory();
            });
        });

        // Update call history display
        function updateCallHistory() {
            const historyList = document.getElementById('historyList');
            
            if (callHistory.length === 0) {
                historyList.innerHTML = '<p class="text-gray-500 text-sm text-center py-8">No calls made yet</p>';
                return;
            }

            historyList.innerHTML = callHistory.map(item => `
                <div class="p-3 bg-gray-50 rounded-lg">
                    <div class="font-medium text-sm text-gray-800">${item.service}</div>
                    <div class="text-sm text-gray-600">${item.number}</div>
                    <div class="text-xs text-gray-500 mt-1">${item.time}</div>
                </div>
            `).join('');
        }

        // Clear history functionality
        document.getElementById('clearHistory').addEventListener('click', function() {
            callHistory = [];
            updateCallHistory();
        });

        // Initialize counters
        updateCounters();