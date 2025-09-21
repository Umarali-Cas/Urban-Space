/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from 'react'
import cls from './AdminPages.module.scss'
import { Button } from '@/shared/Button'
import { useGetProfileQuery } from '@/features/auth/api/authApi'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import type { RootState } from '@/app/store/store'
import {
  useCreatePageMutation,
  useAddPageBlockMutation,
  useUpdateBlockMutation,
  useDeleteBlockMutation,
} from '@/widgets/AdminPages/api/adminPagesApi'

interface Block {
  id: string
  type: string
  position: number
  data: Record<string, any>
}

interface Page {
  id: string
  slug: string
  title: string
  locale: string
  version: number
  is_published?: boolean
  blocks: Block[]
}

export const AdminPages = () => {
  const { data: profile, isLoading: profileLoading } = useGetProfileQuery(
    undefined,
    { skip: false }
  )
  const { user } = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  const [createPage] = useCreatePageMutation()
  const [addPageBlock] = useAddPageBlockMutation()
  const [updateBlock] = useUpdateBlockMutation()
  const [deleteBlock] = useDeleteBlockMutation()

  const [pages, setPages] = useState<Page[]>([])
  const [selectedPage, setSelectedPage] = useState<Page | null>(null)

  const [newPage, setNewPage] = useState({
    slug: '',
    title: '',
    locale: 'ru',
    is_published: false,
  })
  const [newBlock, setNewBlock] = useState({
    locale: 'ru',
    type: '',
    order: 0,
    data: {},
  })
  const [editBlock, setEditBlock] = useState<Block | null>(null)

  useEffect(() => {
    if (!profileLoading && (!user || (user.role !== 'admin' && user.is_superuser !== true))) {
      router.push('/')
    }
  }, [profileLoading, user, router])

  if (profileLoading) {
    return (
      <section>
        <div className={cls.adminWidget}>
          <h1>Проверка доступа...</h1>
        </div>
      </section>
    )
  }

  const handleCreatePage = async () => {
    try {
      const page = await createPage(newPage).unwrap()
      setPages(prev => [...prev, page])
      setNewPage({ slug: '', title: '', locale: 'ru', is_published: false })
    } catch (err) {
      console.error('Ошибка при создании страницы:', err)
    }
  }

  const handleAddBlock = async () => {
    if (!selectedPage) return
    try {
      const block = await addPageBlock({
        pageId: selectedPage.id,
        body: newBlock,
      }).unwrap()
      setPages(prev =>
        prev.map(p =>
          p.id === selectedPage.id ? { ...p, blocks: [...p.blocks, block] } : p
        )
      )
      setNewBlock({ locale: 'ru', type: '', order: 0, data: {} })
    } catch (err) {
      console.error('Ошибка при добавлении блока:', err)
    }
  }

  const handleUpdateBlock = async () => {
    if (!editBlock) return
    try {
      const updated = await updateBlock({
        blockId: editBlock.id,
        body: editBlock,
      }).unwrap()
      setPages(prev =>
        prev.map(p =>
          p.id === selectedPage?.id
            ? {
                ...p,
                blocks: p.blocks.map(b => (b.id === updated.id ? updated : b)),
              }
            : p
        )
      )
      setEditBlock(null)
    } catch (err) {
      console.error('Ошибка при обновлении блока:', err)
    }
  }

  const handleDeleteBlock = async (blockId: string) => {
    try {
      await deleteBlock({ blockId }).unwrap()
      setPages(prev =>
        prev.map(p =>
          p.id === selectedPage?.id
            ? { ...p, blocks: p.blocks.filter(b => b.id !== blockId) }
            : p
        )
      )
    } catch (err) {
      console.error('Ошибка при удалении блока:', err)
    }
  }

  return (
    <section>
      <div className={cls.adminWidget}>
        <h1 className={cls.title}>Редактор страниц</h1>

        {/* Создание страницы */}
        <div className={cls.form}>
          <input
            type="text"
            placeholder="Slug"
            value={newPage.slug}
            onChange={e => setNewPage({ ...newPage, slug: e.target.value })}
          />
          <input
            type="text"
            placeholder="Заголовок"
            value={newPage.title}
            onChange={e => setNewPage({ ...newPage, title: e.target.value })}
          />
          <select
            value={newPage.locale}
            onChange={e => setNewPage({ ...newPage, locale: e.target.value })}
          >
            <option value="ru">ru</option>
            <option value="en">en</option>
          </select>
          <label>
            Опубликовано
            <input
              type="checkbox"
              checked={newPage.is_published}
              onChange={e =>
                setNewPage({ ...newPage, is_published: e.target.checked })
              }
            />
          </label>
          <Button text="Создать страницу" onClick={handleCreatePage} />
        </div>

        {/* Список страниц */}
        <div className={cls.pagesList}>
          {pages.map(page => (
            <div key={page.id} className={cls.pageCard}>
              <h2 onClick={() => setSelectedPage(page)}>
                {page.title} ({page.locale})
              </h2>
              {selectedPage?.id === page.id && (
                <div className={cls.blocksList}>
                  <h3>Блоки</h3>
                  {page.blocks.map(block => (
                    <div key={block.id} className={cls.blockCard}>
                      <p>
                        <b>{block.type}</b> — {JSON.stringify(block.data)}
                      </p>
                      <Button
                        text="Редактировать"
                        onClick={() => setEditBlock(block)}
                      />
                      <Button
                        text="Удалить"
                        onClick={() => handleDeleteBlock(block.id)}
                        className={cls.denyBtn}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Добавление блока */}
        {selectedPage && (
          <div className={cls.form}>
            <h3>Добавить блок</h3>
            <input
              type="text"
              placeholder="Тип"
              value={newBlock.type}
              onChange={e => setNewBlock({ ...newBlock, type: e.target.value })}
            />
            <input
              type="number"
              placeholder="Порядок"
              value={newBlock.order}
              onChange={e =>
                setNewBlock({ ...newBlock, order: Number(e.target.value) })
              }
            />
            <textarea
              placeholder="Данные (JSON)"
              value={JSON.stringify(newBlock.data)}
              onChange={e => {
                try {
                  setNewBlock({ ...newBlock, data: JSON.parse(e.target.value) })
                } catch {
                  console.error('Некорректный JSON')
                }
              }}
            />
            <Button text="Добавить блок" onClick={handleAddBlock} />
          </div>
        )}

        {/* Редактирование блока */}
        {editBlock && (
          <div className={cls.form}>
            <h3>Редактировать блок</h3>
            <input
              type="text"
              placeholder="Тип"
              value={editBlock.type}
              onChange={e =>
                setEditBlock({ ...editBlock, type: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Порядок"
              value={editBlock.position}
              onChange={e =>
                setEditBlock({ ...editBlock, position: Number(e.target.value) })
              }
            />
            <textarea
              placeholder="Данные (JSON)"
              value={JSON.stringify(editBlock.data)}
              onChange={e => {
                try {
                  setEditBlock({
                    ...editBlock,
                    data: JSON.parse(e.target.value),
                  })
                } catch {
                  console.error('Некорректный JSON')
                }
              }}
            />
            <Button text="Сохранить изменения" onClick={handleUpdateBlock} />
          </div>
        )}
      </div>
    </section>
  )
}
