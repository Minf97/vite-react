import { effectStack } from './useEffect.ts';

const subscribe = (effect, subs) => {
  effect.deps.add(subs);
  subs.add(effect);
};

export default (value) => {
  // 记录有哪些依赖需要通知，eg. [effect1, effect2]
  const subs = new Set();

  const getter = () => {
    const effect = effectStack[effectStack.length - 1]; // 获取当前上下文的effect
    if (effect) {
      subscribe(effect, subs); // 建立订阅发布关系
    }
    return value;
  };

  const setter = (newValue) => {
    value = newValue;
    // 通知所有的订阅更新
    for(const effect of [...subs]) {
      effect.execute();
    }
  };

  return [getter, setter];
};
