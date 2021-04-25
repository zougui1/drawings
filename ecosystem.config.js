module.exports = {
  apps: [
    /*{
      name: 'drawing-viewer',
      cwd: './drawing-viewer',
      script: 'npm',
      args: 'start',
      merge_log: false,
      instances: 1,
      min_uptime: 10000,
      watch: false,
      disableClustering: true
    },*/
    /*{
      name: 'dev-server (start)',
      cwd: './dev-server',
      script: 'nodemon',
      args: 'lib -r source-map-support/register lib',
      //script: 'npm',
      //args: 'start',
      merge_log: false,
      instances: 1,
      watch: false,
      env: {
        WATCH_DIR_NAME: 'sfw/DaneroAndArcdanis',
      },
      disableClustering: true
    },*/
    {
      name: 'dev-server (compile)',
      cwd: './dev-server',
      script: 'npm',
      args: 'run compile',
      merge_log: false,
      instances: 1,
      watch: false
    },
    {
      name: 'drawer',
      cwd: './drawer',
      script: 'npm',
      args: 'run compile',
      merge_log: false,
      instances: 1,
      watch: false
    },
    {
      name: 'drawings',
      cwd: './drawings',
      script: 'npm',
      args: 'run compile',
      merge_log: false,
      instances: 1,
      watch: false
    },
    {
      name: 'react-drawer',
      cwd: './react-drawer',
      script: 'npm',
      args: 'run compile',
      merge_log: false,
      instances: 1,
      watch: false
    },
  ],
};
