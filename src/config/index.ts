import pkg from '../../package.json'

const ENV = import.meta.env

const getConfig = () => {
  return Object.assign({}, ENV, {
    version: pkg.version,
    dependencies: pkg.dependencies,
    devDependencies: pkg.devDependencies
  })
}

export const config = getConfig()
