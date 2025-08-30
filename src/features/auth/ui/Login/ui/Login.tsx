'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import userIcon from '@/features/auth/assets/user-icon.svg';
import { Button } from '@/shared/Button';
import Link from 'next/link';
import cls from './Login.module.scss';
import { Input } from '@/shared/Input';
import eyesIcon from '@/features/auth/assets/eye-icon.svg';
import closedEyesIcon from '@/features/auth/assets/closed-eye-icon.svg';
import { useLoginMutation } from '@/features/auth/api/authApi';
import { useAppDispatch } from '@/shared/hooks/reduxHooks';
import { setCredentials } from '@/features/auth/lib/authSlice';
import { useRouter } from 'next/navigation';
import { Modal } from '@/shared/Modal';

export const LoginW = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Заполните все поля');
      setIsModalOpen(true);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Некорректный формат email');
      setIsModalOpen(true);
      return;
    }
    try {
      setError(null);
      setIsModalOpen(false);
      const result = await login({ email, password }).unwrap();
      dispatch(setCredentials(result));
      router.push('/');
    } catch (err: unknown) {
      interface LoginError {
        data?: {
          message?: string;
        };
      }

      if (
        typeof err === 'object' &&
        err !== null &&
        'data' in err &&
        typeof (err as LoginError).data?.message === 'string'
      ) {
        setError((err as LoginError).data!.message!);
      } else {
        setError('Ошибка авторизации');
      }
      setIsModalOpen(true);
    }
  };

  return (
    <section className={cls.loginWidget}>
      <Image src={userIcon} alt="user-icon" width={32} height={32} />
      <h3>Авторизация</h3>

      <div className={cls.formGroup}>
        <p>Почта</p>
        <Input
          text="Введите вашу почту"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
      </div>

      <div className={cls.formGroup}>
        <p>Пароль</p>
        <div className={cls.passwordContainer}>
          <Input
            text="Пароль"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          <Button
            text={
              showPassword ? (
                <Image src={closedEyesIcon} alt="eye" width={20} height={20} />
              ) : (
                <Image src={eyesIcon} alt="eye" width={20} height={20} />
              )
            }
            onClick={togglePasswordVisibility}
            className={cls.eyeButton}
          />
        </div>

        <div className={cls.memoryGroup}>
          <input type="checkbox" className={cls.checkBox} />
          <p className={cls.rememberMe}>Запомнить меня</p>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={error || 'Произошла ошибка'}
      />

      <Button
        text={isLoading ? 'Загрузка...' : 'Войти'}
        onClick={handleLogin}
        disabled={isLoading}
        className={cls.loginButton}
      />

      <Link href="/register" className={cls.registrationButtonLink}>
        <Button text="Регистрация" className={cls.registerButton} />
      </Link>
    </section>
  );
};