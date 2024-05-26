import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../components/Input';
import Title from '../components/Title';
import classes from '../css/pages/registerPage.module.css';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function RegisterPage() {
  const auth = useAuth();
  const { user } = auth;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');

  useEffect(() => {
    if (!user) return;
    // returnUrl ? navigate(returnUrl) : navigate('/');
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

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: 'Customer'  // Setting default value for userType
    }
  });

  const submit = async data => {
    await auth.register(data);
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <Title title="Register" />
        <form onSubmit={handleSubmit(submit)} noValidate>
          <Input
            type="text"
            label="Name"
            {...register('name', {
              required: true,
              minLength: 5,
            })}
            error={errors.name}
          />

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
              minLength: 5,
            })}
            error={errors.password}
          />

          <Input
            type="password"
            label="Confirm Password"
            {...register('confirmPassword', {
              required: true,
              validate: value =>
                value !== getValues('password')
                  ? 'Passwords Do Not Match'
                  : true,
            })}
            error={errors.confirmPassword}
          />

          <Input
            type="text"
            label="Address"
            {...register('address', {
              required: true,
              minLength: 10,
            })}
            error={errors.address}
          />

          {/* <div className={classes.radioGroup}> */}
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
          {/* </div> */}

          <Button type="submit" text="Register" />

          <div className={classes.login}>
            Already a user? &nbsp;
            <Link to={`/login${returnUrl ? '?returnUrl=' + returnUrl : ''}`}>
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
