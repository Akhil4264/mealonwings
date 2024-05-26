import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import classes from '../css/pages/loginPage.module.css';
import Title from '../components/Title';
import Input from '../components/Input';
import Button from '../components/Button';
export default function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: 'Customer'  // Setting default value for userType
    }
  });

  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');

  useEffect(() => {
    if (!user) return;

    // returnUrl ? navigate(returnUrl) : navigate('/');
    console.log(user)
    if (user.role === 'Customer') {
      navigate('/');
    } else if (user.role === 'Employee') {
      navigate('/employee');
    } else if (user.role === 'Flight Regulator') {
      navigate('/flightregs');
    } 
    else {
      // Default navigation if the role is not recognized
      navigate('/');
    }
  }, [user]);

  const submit = async ({ email, password, role }) => {
    await login(email, password, role);
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Login" />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            type="email"
            label="Email"
            {...register('email', {
              required: true,
            })}
            error={errors.email}
          />

          <Input
            type="password"
            label="Password"
            {...register('password', {
              required: true,
            })}
            error={errors.password}
          />


          <label id='radio'>User Type:</label>
          <label>
            <input
              type="radio"
              value="Customer"
              htmlFor="radio"
              {...register('role', { required: true })}
            />
            Customer
          </label>
          <label>
            <input
              type="radio"
              value="Flight Regulator"
              htmlFor="radio"
              {...register('role', { required: true })}
            />
            Flight Regulator
          </label>
          <label>
            <input
              type="radio"
              value="Employee"
              htmlFor="radio"
              {...register('role', { required: true })}
            />
            Employee
          </label>

          <Button type="submit" text="Login" />

          <div className={classes.register}>
            New user? &nbsp;
            <Link to={`/register${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
