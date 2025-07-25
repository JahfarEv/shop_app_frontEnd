// import { useState } from 'react';
// import { Mail, Phone, Lock, Eye, EyeOff, Shield, AlertCircle, ArrowRight } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import "../stylesheets/AdminLogin.css";

// export default function AdminLogin() {
//   const [email, setEmail] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setErrorMsg('');

//     const payload = { email, mobileNumber, password };

//     try {
//       const res = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/auth/admin/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         setErrorMsg(errorData.message || 'Login failed');
//         return;
//       }

//       const data = await res.json();

//       if (!data.token) {
//         setErrorMsg('Token not received. Try again.');
//         return;
//       }

//       // ✅ Save token to localStorage
//       localStorage.setItem('adminToken', data.token);

//       // ✅ Example usage how the protected routes are made with  jwt token- just example to test: send token in future API request (can be reused elsewhere)
//       const protectedRes = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/admin/protected-data`, {
//         headers: {
//           'Authorization': `Bearer ${data.token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       const protectedData = await protectedRes.json();
//       console.log('Protected data:', protectedData);

//       // ✅ Redirect to dashboard
//       navigate('/admin/dashboard');

//     } catch (err) {
//       console.error('Login error:', err);
//       setErrorMsg('Server error. Try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="admin-login-container">
//       <div className="bg-element bg-element-1"></div>
//       <div className="bg-element bg-element-2"></div>
//       <div className="bg-element bg-element-3"></div>
//       <div className="bg-element bg-element-4"></div>

//       <div className="login-card">
//         <div className="login-header">
//           <div className="header-icon">
//             <Shield color="white" size={32} />
//           </div>
//           <h1 className="header-title">Admin Portal</h1>
//           <p className="header-subtitle">Welcome back! Please sign in to continue</p>
//         </div>

//         <form className="login-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label className="form-label">Email Address</label>
//             <div className="input-wrapper">
//               <Mail className="input-icon" size={20} />
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 autoComplete="new-email"
//                 className="form-input"
//                 placeholder="Enter your email"
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label className="form-label">Mobile Number</label>
//             <div className="input-wrapper">
//               <Phone className="input-icon" size={20} />
//               <input
//                 type="tel"
//                 value={mobileNumber}
//                 onChange={(e) => setMobileNumber(e.target.value)}
//                 required
//                 autoComplete="new-tel"
//                 className="form-input"
//                 placeholder="Enter your mobile number"
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label className="form-label">Password</label>
//             <div className="input-wrapper">
//               <Lock className="input-icon" size={20} />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 autoComplete="new-password"
//                 className="form-input password-input"
//                 placeholder="Enter your password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="password-toggle"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>
//           </div>

//           {errorMsg && (
//             <div className="error-message">
//               <AlertCircle size={16} />
//               <span>{errorMsg}</span>
//             </div>
//           )}

//           <button 
//             type="submit"
//             disabled={isLoading}
//             className="submit-button"
//           >
//             {isLoading ? (
//               <>
//                 <div className="loading-spinner"></div>
//                 <span>Signing in...</span>
//               </>
//             ) : (
//               <>
//                 <span>Sign In</span>
//                 <ArrowRight size={18} />
//               </>
//             )}
//           </button>
//         </form>

//         <div className="login-footer">
//           <p className="footer-text">Secure admin access • Protected by encryption</p>
//         </div>
//       </div>
//     </div>
//   );
// }




// import { useState } from 'react';
// import {
//   Mail, Phone, Lock, Eye, EyeOff, Shield, AlertCircle, ArrowRight, UserCircle
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import "../stylesheets/AdminLogin.css";

// const roleConfig = {
//   admin: {
//     api: `${import.meta.env.VITE_APP_BACKEND_URL}/auth/admin/login`,
//     tokenKey: 'adminToken',
//     dashboard: '/admin/dashboard',
//   },
//   salesman: {
//     api: 'http://localhost:8000/api/salesman/login',
//     tokenKey: 'salesmanToken',
//     dashboard: '/salesman/dashboard',
//   },
//   manager: {
//     api: 'http://localhost:8000/api/manager/login',
//     tokenKey: 'managerToken',
//     dashboard: '/manager/dashboard',
//   },
// };

// export default function LoginPage() {
//   const [role, setRole] = useState('admin');
//   const [email, setEmail] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setErrorMsg('');

//     const payload = { email, mobileNumber, password };

//     try {
//       const res = await fetch(roleConfig[role].api, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         setErrorMsg(errorData.message || 'Login failed');
//         return;
//       }

//       const data = await res.json();

//       if (!data.token) {
//         setErrorMsg('Token not received. Try again.');
//         return;
//       }

//       localStorage.setItem(roleConfig[role].tokenKey, data.token);
//       navigate(roleConfig[role].dashboard);

//     } catch (err) {
//       console.error('Login error:', err);
//       setErrorMsg('Server error. Try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="admin-login-container">
//       <div className="bg-element bg-element-1"></div>
//       <div className="bg-element bg-element-2"></div>
//       <div className="bg-element bg-element-3"></div>
//       <div className="bg-element bg-element-4"></div>

//       <div className="login-card">
//         <div className="login-header">
//           <div className="header-icon">
//             <Shield color="white" size={32} />
//           </div>
//           <h1 className="header-title">Portal Login</h1>
//           <p className="header-subtitle">Select your role and sign in</p>
//         </div>

//         <form className="login-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label className="form-label">Login As</label>
//             <div className="input-wrapper">
//               <UserCircle className="input-icon" size={20} />
//               <select
//                 className="form-input"
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//               >
//                 <option value="admin">Admin</option>
//                 <option value="salesman">Salesman</option>
//                 <option value="manager">Manager</option>
//               </select>
//             </div>
//           </div>

//           <div className="form-group">
//             <label className="form-label">Email Address</label>
//             <div className="input-wrapper">
//               <Mail className="input-icon" size={20} />
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 autoComplete="new-email"
//                 className="form-input"
//                 placeholder="Enter your email"
//               />
//             </div>
//           </div>

//           {/* <div className="form-group">
//             <label className="form-label">Mobile Number</label>
//             <div className="input-wrapper">
//               <Phone className="input-icon" size={20} />
//               <input
//                 type="tel"
//                 value={mobileNumber}
//                 onChange={(e) => setMobileNumber(e.target.value)}
//                 required
//                 autoComplete="new-tel"
//                 className="form-input"
//                 placeholder="Enter your mobile number"
//               />
//             </div>
//           </div> */}

//           <div className="form-group">
//             <label className="form-label">Password</label>
//             <div className="input-wrapper">
//               <Lock className="input-icon" size={20} />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 autoComplete="new-password"
//                 className="form-input password-input"
//                 placeholder="Enter your password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="password-toggle"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>
//           </div>

//           {errorMsg && (
//             <div className="error-message">
//               <AlertCircle size={16} />
//               <span>{errorMsg}</span>
//             </div>
//           )}

//           <button 
//             type="submit"
//             disabled={isLoading}
//             className="submit-button"
//           >
//             {isLoading ? (
//               <>
//                 <div className="loading-spinner"></div>
//                 <span>Signing in...</span>
//               </>
//             ) : (
//               <>
//                 <span>Sign In</span>
//                 <ArrowRight size={18} />
//               </>
//             )}
//           </button>
//         </form>

//         <div className="login-footer">
//           <p className="footer-text">Secure access • Role-based login system</p>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from 'react';
import {
  Mail, Phone, Lock, Eye, EyeOff, Shield, AlertCircle, ArrowRight, UserCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "../stylesheets/AdminLogin.css";

const roleConfig = {
  admin: {
    api: `${import.meta.env.VITE_APP_BACKEND_URL}/auth/admin/login`,
    tokenKey: 'adminToken',
    dashboard: '/admin/dashboard',
    authField: 'email'
  },
  salesman: {
    api: `${import.meta.env.VITE_APP_BACKEND_URL}/api/salesman/login`,
    tokenKey: 'salesmanToken',
    dashboard: '/salesman/dashboard',
    authField: 'mobileNumber'
  },
  manager: {
    api: `${import.meta.env.VITE_APP_BACKEND_URL}/api/manager/login`,
    tokenKey: 'managerToken',
    dashboard: '/manager/dashboard',
    authField: 'mobileNumber'
  },
};

export default function LoginPage() {
  const [role, setRole] = useState('admin');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const payload = { 
      [roleConfig[role].authField]: role === 'admin' ? email : mobileNumber,
      password 
    };

    try {
      const res = await fetch(roleConfig[role].api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setErrorMsg(errorData.message || 'Login failed');
        return;
      }

      const data = await res.json();

      if (!data.token) {
        setErrorMsg('Token not received. Try again.');
        return;
      }

      localStorage.setItem(roleConfig[role].tokenKey, data.token);
      navigate(roleConfig[role].dashboard);

    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg('Server error. Try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="bg-element bg-element-1"></div>
      <div className="bg-element bg-element-2"></div>
      <div className="bg-element bg-element-3"></div>
      <div className="bg-element bg-element-4"></div>

      <div className="login-card">
        <div className="login-header">
          <div className="header-icon">
            <Shield color="white" size={32} />
          </div>
          <h1 className="header-title">Portal Login</h1>
          <p className="header-subtitle">Select your role and sign in</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Login As</label>
            <div className="input-wrapper">
              <UserCircle className="input-icon" size={20} />
              <select
                className="form-input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="salesman">Salesman</option>
                <option value="manager">Manager</option>
              </select>
            </div>
          </div>

          {role === 'admin' ? (
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="new-email"
                  className="form-input"
                  placeholder="Enter your email"
                />
              </div>
            </div>
          ) : (
            <div className="form-group">
              <label className="form-label">Mobile Number</label>
              <div className="input-wrapper">
                <Phone className="input-icon" size={20} />
                <input
                  type="text"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                  autoComplete="new-tel"
                  className="form-input"
                  placeholder="Enter your mobile number"
                  pattern="[0-9]{10}"
                  maxLength="10"
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                className="form-input password-input"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="error-message">
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>

          {(role === 'salesman' || role === 'manager') && (
  <div className="register-link">
    <p>Don't have an account? <a href={`/${role}/register`}>Register here</a></p>
  </div>
)}

        </form>

        <div className="login-footer">
          <p className="footer-text">Secure access • Role-based login system</p>
        </div>
      </div>
    </div>
  );
}