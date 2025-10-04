import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { PasteFormData, PasteResponse } from '@/types';

export default function Form() {
  const { t } = useTranslation();
  const { readOnce, config, updateState } = useAppStore();
  const nobody = useAppStore(state => state.namespace === 'nobody');

  const [form, setForm] = useState<PasteFormData>({
    lang: 'plain',
    content: '',
    password: '',
    self_destruct: true,
    expire_count: 1,
    expire_second: 300
  });

  const [expireMinute, setExpireMinute] = useState(5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = api.join(config.api.backend, 'paste/');
    try {
      const response: PasteResponse = await api.post(url, form);

      if (response.code === 201) {
        updateState({
          view: 'success',
          key: response.key || ''
        });
      } else {
        alert(`${response.code}: ${response.message}`);
      }
    } catch (error) {
      console.error('Failed to create paste:', error);
      alert('Failed to create paste');
    }
  };

  const handleExpireMinuteChange = (value: string) => {
    const minutes = parseInt(value, 10);
    setExpireMinute(minutes);
    setForm({ ...form, expire_second: minutes * 60 });
  };

  const languages = [
    { value: 'plain', label: t('form.select.plain') },
    { value: 'cpp', label: 'C/C++' },
    { value: 'java', label: 'Java' },
    { value: 'python', label: 'Python' },
    { value: 'bash', label: 'Bash' },
    { value: 'markdown', label: 'Markdown' },
    { value: 'json', label: 'JSON' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
  ];

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Language Selector */}
          <div className="flex items-center gap-3 flex-1">
            <Label className="w-16 text-right shrink-0">{t('form.input.0.prepend')}</Label>
            <Select
              value={form.lang}
              onValueChange={(value) => setForm({ ...form, lang: value })}
            >
              <SelectTrigger className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Password Input */}
          <div className="flex items-center gap-3 flex-1">
            <Label className="w-16 text-right shrink-0">{t('form.input.1.prepend')}</Label>
            <Input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder={t('form.input.1.placeholder')}
              autoComplete="off"
              className="flex-1"
            />
            <Switch checked={form.password !== ''} disabled />
          </div>
        </div>

        {/* Content Textarea */}
        <div className="space-y-2">
          <Textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder={t(`form.textarea.placeholder.${readOnce ? 'read_once' : 'write_something_here'}`)}
            rows={10}
            required
            className="font-mono resize-none"
            style={{ tabSize: 4 }}
          />
        </div>

        {/* Submit and Options */}
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" variant={readOnce ? 'secondary' : 'default'} size="default">
            {t('form.submit')}
          </Button>

          {!readOnce && form.self_destruct && (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="self-destruct"
                      checked={form.self_destruct}
                      onCheckedChange={(checked) =>
                        setForm({ ...form, self_destruct: checked })
                      }
                      disabled={nobody}
                    />
                    <Label htmlFor="self-destruct" className="cursor-pointer text-sm">
                      {t('form.checkbox.text')}
                    </Label>
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  {t('form.checkbox.popover')}
                </PopoverContent>
              </Popover>

              <div className="flex items-center gap-1 text-sm">
                <span>{t('form.count.prepend')}</span>
                <Input
                  type="number"
                  min={1}
                  max={3}
                  value={form.expire_count}
                  onChange={(e) => setForm({ ...form, expire_count: parseInt(e.target.value, 10) })}
                  disabled={nobody}
                  className="w-16 h-8 text-center"
                />
                <span>{t('form.count.append')}</span>
              </div>

              <span className="text-sm text-gray-400">or</span>

              <div className="flex items-center gap-1 text-sm">
                <Input
                  type="number"
                  min={1}
                  max={60}
                  value={expireMinute}
                  onChange={(e) => handleExpireMinuteChange(e.target.value)}
                  disabled={nobody}
                  className="w-16 h-8 text-center"
                />
                <span>{t('form.time.append')}</span>
              </div>
            </>
          )}

          {!readOnce && !form.self_destruct && (
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center gap-2">
                  <Switch
                    id="self-destruct"
                    checked={form.self_destruct}
                    onCheckedChange={(checked) =>
                      setForm({ ...form, self_destruct: checked })
                    }
                    disabled={nobody}
                  />
                  <Label htmlFor="self-destruct" className="cursor-pointer text-sm">
                    {t('form.checkbox.text')}
                  </Label>
                </div>
              </PopoverTrigger>
              <PopoverContent>
                {t('form.checkbox.popover')}
              </PopoverContent>
            </Popover>
          )}
        </div>
      </form>
    </div>
  );
}
