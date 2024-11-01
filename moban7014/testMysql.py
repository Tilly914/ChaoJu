import mysql.connector
from mysql.connector import Error

try:
    # 连接到 MySQL 数据库
    connection = mysql.connector.connect(
        host='localhost',
        database='BlogDB',
        user='root',
        password='123456'
    )

    if connection.is_connected():
        # 创建 cursor 对象
        cursor = connection.cursor()

        # 插入视频路径到数据库
        insert_query = """
            INSERT INTO blog_posts (title, content, author, media)
            VALUES (%s, %s, %s, %s)
        """
        video_file_path = 'D:\\学习笔记\\大创视频\\苗族素材\\【Google Arts & Culture】苗族非物质文化遗产——银饰_P5_用铁钩固定待焊板块.mp4'  # 确保这是正确的文件路径
        values = ('示例视频', '这是视频内容。', '作者名', video_file_path)
        cursor.execute(insert_query, values)

        # 提交事务
        connection.commit()
        print("视频路径已成功插入数据库。")

except Error as e:
    print("错误：", e)

finally:
    # 关闭数据库连接
    if connection.is_connected():
        cursor.close()
        connection.close()
        print("MySQL 连接已关闭。")