async function loadModule() {
  const { exec } = await import("child_process");

  // 首先执行文件上传
  console.log("开始上传文件...");
  exec(
    'scp -P 22 -i "C:\\Users\\admin\\.ssh\\id_ed25519_all" -r "dist\\*" root@172.22.90.3:/opt/enwo/web/gfdz/frontend/',
    (error, stdout, stderr) => {
      if (error) {
        console.error(`执行文件上传时出错: ${error}`);
        return;
      }
      console.log(`文件上传成功!`);
      if (stdout) console.log(`stdout: ${stdout}`);
      if (stderr) console.error(`stderr: ${stderr}`);

      // 文件上传成功后，执行权限修改命令
      console.log("开始设置文件权限...");
      exec(
        'ssh -p 22 -i "C:\\Users\\admin\\.ssh\\id_ed25519_all" root@172.22.90.3 "chmod -R 777 /opt/enwo/web/gfdz/frontend/*"',
        (chmodError, chmodStdout, chmodStderr) => {
          if (chmodError) {
            console.error(`执行权限修改命令时出错: ${chmodError}`);
            return;
          }
          console.log(`文件权限设置成功!`);
          if (chmodStdout) console.log(`stdout: ${chmodStdout}`);
          if (chmodStderr) console.error(`stderr: ${chmodStderr}`);
        }
      );
    }
  );
}

loadModule();
