import { nodeResolve } from 'rollup-plugin-node-resolve';
export default {
  input: 'src/index.js',
  output: {
    file: 'bundle.js',
    format: 'cjs', // 或者其他你需要的格式
  },
  plugins: [
    nodeResolve(), // 启用nodeResolve插件
  ],
};
