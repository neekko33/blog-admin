import {useEffect, useState} from 'react'
import MDEditor from '@uiw/react-md-editor'
import {Button, Card, Form, FormProps, Input, message as antdMessage, notification, Select, Space} from 'antd'
import {AxiosResponseData, Post, SelectOptions, SelectType} from '../../index'
import {UploadOutlined} from '@ant-design/icons'
import {getCategories} from '../../apis/category.ts'
import {getTags} from '../../apis/tag.ts'
import {addPost, getPost, updatePost} from '../../apis/post.ts'
import store from '../../store/store.ts'
import {selectUserId} from '../../store/slices/authSlice.ts'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {useForm} from 'antd/es/form/Form'

export default function PostEdit() {
  const [form] = useForm<PostFormType>()
  const [content, setContent] = useState('')
  const [fileName, setFileName] = useState('')
  const [categoryOptions, setCategoryOptions] = useState<SelectOptions[]>([])
  const [tagOptions, setTagOptions] = useState<SelectOptions[]>([])
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const postId = params.get('id')


  type PostFormType = {
    title: string
    categoryId: string
    tags: string[]
  }

  const onFinish: FormProps<PostFormType>['onFinish'] = async (values) => {
    const formData = {
      title: values.title,
      categoryId: values.categoryId,
      tags: values.tags.map(id => ({id}))
    }
    try {
      let result: AxiosResponseData<Post>
      if (postId) {
        result = await updatePost(postId, {
          ...formData,
          content,
          authorId: Number(selectUserId(store.getState()))
        })
      } else {
        result = await addPost({...formData, content, authorId: Number(selectUserId(store.getState()))})
      }
      const {message} = result
      if (message === 'success') {
        antdMessage.success('保存成功！')
        navigate('/post/list')
      } else {
        notification.error({
          message: '保存失败',
          description: message
        })
      }
    } catch (e) {
      notification.error({
        message: '保存失败',
        description: (e as object).toString()
      })
    }
  }

  const initialData = async () => {
    const {data: {data: categories}} = await getCategories()
    const {data: {data: tags}} = await getTags()
    if (categories.length >= 1) {
      const sOptions: SelectOptions[] = categories.map(c => ({label: c.name, value: c.id as string}))
      setCategoryOptions(sOptions)
    }
    if (tags.length >= 1) {
      const tOptions: SelectOptions[] = tags.map(c => ({label: c.name || '', value: c.id as string}))
      setTagOptions(tOptions)
    }
    // post edit page
    if (postId) {
      const {message, data} = await getPost(Number(postId))
      if (message === 'success') {
        form.setFieldsValue({
          title: data.title,
          categoryId: data.categoryId,
          tags: data.tags.map(tag => tag.id as string)
        })
        setContent(data.content || '')
      }
    }
  }

  const onReadFile = async () => {
    try {
      const fileHandler: FileSystemFileHandle[] = await window.showOpenFilePicker()
      // 判断是否为 md 文件
      if (!fileHandler[0].name.endsWith('md')) {
        antdMessage.error('读取文件失败，仅支持MD文件格式！')
        return
      }
      setFileName(fileHandler[0].name)
      const file = await fileHandler[0].getFile()
      const reader = new FileReader()
      reader.onload = () => {
        setContent(reader.result as string)
      }
      reader.readAsText(file)
    } catch (e) {
      antdMessage.error('读取文件失败：' + (e as object).toString())
    }
  }

  useEffect(() => {
    initialData().then()
  }, [])

  return (
    <>
      <Card className="mb-3">
        <Form
          className="flex w-full items-center justify-around"
          wrapperCol={{span: 16}}
          initialValues={{remember: true}}
          autoComplete="off"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item<SelectType>
            label="标题"
            name="title"
            className="flex-1 mb-0"
          >
            <Input/>
          </Form.Item>
          <Form.Item<SelectType>
            label="分类"
            name="categoryId"
            className="flex-1 mb-0"
          >
            <Select options={categoryOptions} placeholder="选择文章分类"/>
          </Form.Item>
          <Form.Item<SelectType>
            label="标签"
            name="tags"
            className="flex-1 mb-0"
          >
            <Select mode="multiple" options={tagOptions} placeholder="选择文章标签" allowClear/>
          </Form.Item>
          <div className="w-1/6 mb-0 flex justify-end">
            <Space size="middle">
              <Button>重置</Button>
              <Button type="primary" htmlType="submit">保存</Button>
            </Space>
          </div>
        </Form>
      </Card>
      <Card>
        <div className="flex justify-between items-center pb-5 ">
          <div className="flex">
            <Space size="middle">
              <Button className="flex flex-row items-center" onClick={onReadFile}><UploadOutlined/><span>文件读取</span></Button>
              <div>{fileName}</div>
            </Space>
          </div>
        </div>
        <MDEditor height={'600px'} value={content} onChange={(value) => setContent(value || '')}/>
      </Card>
    </>
  )
}
