// Konfigurasi server
    let serverConfig = {
      maintenance: false // Default: server tidak dalam mode maintenance
    };

    // Status login saat ini
    let currentUser = null;

    // Simpan konfigurasi ke localStorage (jika tersedia)
    function saveConfig() {
      if (typeof(Storage) !== "undefined") {
        localStorage.setItem('serverConfig', JSON.stringify(serverConfig));
      }
    }

    // Muat konfigurasi dari localStorage (jika tersedia)
    function loadConfig() {
      if (typeof(Storage) !== "undefined") {
        const savedConfig = localStorage.getItem('serverConfig');
        if (savedConfig) {
          serverConfig = JSON.parse(savedConfig);
        }
      }
      updateMaintenanceUI();
    }

    // Perbarui UI berdasarkan status maintenance
    function updateMaintenanceUI() {
      const maintenanceNotice = document.getElementById('maintenanceNotice');
      const maintenanceToggle = document.getElementById('maintenanceToggle');
      const maintenanceStatus = document.getElementById('maintenanceStatus');
      
      if (serverConfig.maintenance) {
        maintenanceNotice.classList.remove('hidden');
        if (maintenanceToggle) {
          maintenanceToggle.checked = true;
        }
        if (maintenanceStatus) {
          maintenanceStatus.textContent = 'Aktif';
        }
      } else {
        maintenanceNotice.classList.add('hidden');
        if (maintenanceToggle) {
          maintenanceToggle.checked = false;
        }
        if (maintenanceStatus) {
          maintenanceStatus.textContent = 'Nonaktif';
        }
      }
    }

    // Toggle maintenance mode
    function toggleMaintenanceMode() {
      // Pastikan hanya admin yang bisa mengubah mode maintenance
      if (currentUser && currentUser.username === "admin") {
        serverConfig.maintenance = !serverConfig.maintenance;
        saveConfig();
        updateMaintenanceUI();
        
        if (serverConfig.maintenance) {
          alert('Maintenance mode diaktifkan. Pengguna tidak dapat membuat panel baru.');
        } else {
          alert('Maintenance mode dinonaktifkan. Server beroperasi normal.');
        }
      } else {
        alert('Hanya admin yang dapat mengubah mode maintenance.');
        // Reset toggle ke posisi semula
        document.getElementById('maintenanceToggle').checked = serverConfig.maintenance;
      }
    }

    // Create background particles
    function createParticles() {
      const particlesContainer = document.getElementById('particles');
      const particleCount = 30;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 15;
        const opacity = Math.random() * 0.4 + 0.1;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.opacity = opacity;
        
        particlesContainer.appendChild(particle);
      }
    }
    
    // Initialize particles
    createParticles();
    loadConfig(); // Muat konfigurasi saat halaman dimuat

    // Valid credentials (4 username dan password)
    const validCredentials = [
      { username: "admin", password: "gustafhosting123" },
      { username: "gustaf", password: "panel2023" },
      { username: "hosting", password: "cpanelv1" },
      { username: "reseller", password: "gaming2023" }
    ];

    let loginAttempts = 0;
    const maxAttempts = 3;

    function validateLogin() {
      const adminUsername = document.getElementById('adminUsername').value.trim();
      const adminPassword = document.getElementById('adminPassword').value;
      const loginBtn = document.getElementById('loginBtn');
      let isValid = true;

      // Reset error states
      document.getElementById('adminUsernameError').style.display = 'none';
      document.getElementById('adminPasswordError').style.display = 'none';
      document.getElementById('adminUsername').classList.remove('input-error');
      document.getElementById('adminPassword').classList.remove('input-error');

      // Validate username
      if (!adminUsername) {
        document.getElementById('adminUsernameError').style.display = 'block';
        document.getElementById('adminUsername').classList.add('input-error');
        isValid = false;
      }

      // Validate password
      if (!adminPassword) {
        document.getElementById('adminPasswordError').style.display = 'block';
        document.getElementById('adminPassword').classList.add('input-error');
        isValid = false;
      }

      if (!isValid) return;

      // Check if maximum attempts reached
      if (loginAttempts >= maxAttempts) {
        alert('Anda telah melebihi batas percobaan login. Silakan coba lagi nanti.');
        return;
      }

      // Show loading state
      loginBtn.classList.add('btn-loading');

      // Simulate authentication process
      setTimeout(() => {
        loginBtn.classList.remove('btn-loading');
        
        // Check credentials
        const isValidLogin = validCredentials.some(cred => 
          cred.username === adminUsername && cred.password === adminPassword
        );
        
        if (isValidLogin) {
          // Successful login
          currentUser = { username: adminUsername, password: adminPassword };
          document.getElementById('loginStep').classList.add('hidden');
          document.getElementById('step1').classList.remove('hidden');
          
          // Tampilkan kontrol admin hanya jika login dengan admin/gustafhosting123
          if (adminUsername === "admin" && adminPassword === "gustafhosting123") {
            document.getElementById('adminControls').classList.remove('hidden');
          }
          
          loginAttempts = 0; // Reset attempts on successful login
          updateAttemptDisplay();
        } else {
          // Failed login
          loginAttempts++;
          updateAttemptDisplay();
          
          if (loginAttempts >= maxAttempts) {
            alert('Anda telah melebihi batas percobaan login. Silakan coba lagi nanti.');
          } else {
            alert('Username atau password salah! Percobaan ' + loginAttempts + ' dari ' + maxAttempts);
          }
        }
      }, 1000);
    }

    function updateAttemptDisplay() {
      document.getElementById('attemptCount').textContent = loginAttempts;
    }

    const hargaPaket = {
      "1gb": { ram: 1000, disk: 1000, cpu: 40 },
      "2gb": { ram: 2000, disk: 1000, cpu: 60 },
      "3gb": { ram: 3000, disk: 2000, cpu: 80 },
      "4gb": { ram: 4000, disk: 2000, cpu: 100 },
      "5gb": { ram: 5000, disk: 3000, cpu: 120 },
      "6gb": { ram: 6000, disk: 3000, cpu: 140 },
      "7gb": { ram: 7000, disk: 4000, cpu: 160 },
      "8gb": { ram: 8000, disk: 4000, cpu: 180 },
      "9gb": { ram: 9000, disk: 5000, cpu: 200 },
      "10gb": { ram: 10000, disk: 5000, cpu: 220 },
      "unli": { ram: 0, disk: 0, cpu: 0 }
    };

    function validatePanelForm() {
      const username = document.getElementById('username').value.trim();
      const paket = document.getElementById('paket').value;
      let isValid = true;

      // Reset error states
      document.getElementById('usernameError').style.display = 'none';
      document.getElementById('paketError').style.display = 'none';
      document.getElementById('username').classList.remove('input-error');
      document.getElementById('paket').classList.remove('input-error');

      // Validate username
      if (!username || username.length < 3) {
        document.getElementById('usernameError').style.display = 'block';
        document.getElementById('username').classList.add('input-error');
        isValid = false;
      }

      // Validate package selection
      if (!paket) {
        document.getElementById('paketError').style.display = 'block';
        document.getElementById('paket').classList.add('input-error');
        isValid = false;
      }

      return isValid;
    }

    async function buatPanel() {
      // Cek apakah server dalam mode maintenance
      if (serverConfig.maintenance) {
        alert('Server sedang dalam mode maintenance. Tidak dapat membuat panel baru.');
        return;
      }

      if (!validatePanelForm()) {
        return;
      }

      const username = document.getElementById('username').value.trim();
      const paket = document.getElementById('paket').value;
      const submitBtn = document.getElementById('submitBtn');

      const conf = hargaPaket[paket];

      // Show loading state
      submitBtn.classList.add('btn-loading');

      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // In a real scenario, you would use the actual API:
        /*
        const res = await fetch(`https://api.resellergaming.my.id/pterodactyl/addpanel?domain=https://domainpanel.com&plta=plta_mu&username=${username}&disk=${conf.disk}&cpu=${conf.cpu}`);
        const data = await res.json();
        */

        // For demo purposes, we'll use mock data
        const mockData = {
          user: {
            attributes: {
              email: `${username}@gustafhosting.com`,
              username: username,
            }
          }
        };
        const data = mockData;

        if (data && data.user) {
          document.getElementById('step1').classList.add('hidden');
          document.getElementById('step2').classList.remove('hidden');

          document.getElementById('email').innerText = data.user.attributes.email;
          document.getElementById('uname').innerText = data.user.attributes.username;
          document.getElementById('pass').innerText = data.user.attributes.username;
          document.getElementById('ram').innerText = paket.toUpperCase();
        } else {
          alert('Gagal membuat panel. Coba lagi.');
        }
      } catch (err) {
        alert('Terjadi kesalahan: ' + err.message);
      } finally {
        submitBtn.classList.remove('btn-loading');
      }
    }

    function resetForm() {
      document.getElementById('step2').classList.add('hidden');
      document.getElementById('step1').classList.remove('hidden');
      document.getElementById('username').value = '';
      document.getElementById('paket').value = '';
    }

    // Allow form submission with Enter key
    document.addEventListener('DOMContentLoaded', function() {
      document.getElementById('adminPassword').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          validateLogin();
        }
      });
    });